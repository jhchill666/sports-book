define(function (require) {

    var Marionette = require('marionette');
    var cookie = require('cookie');

    return Marionette.Controller.extend({

        dependencies: 'session=sessionModel, cookieName, commands, vent, apiService, socketService',
        
        timerRunning : false,
        eventTimerInterval: 1000,
        eventTimerCount: 0,
        
        //For WebSocket Streaming
        keepAliveInterval: 10,
        
        //For Api Server
        keepAliveApiInterval: 20,
        keepAliveApiTimerCount: 0,
        keepAliveApiStarted: false,

        ready: function(options){
            _.bindAll(this, 'onLoginSuccess', 'onLogout', 'onValidationFailure', 'onValidationSuccess', 'onPostStartup', 'onWSPublicLoginComplete');
            this.vent.bind('application:complete', this.onPostStartup);
            this.vent.bind('websocket:publicLoginComplete', this.onWSPublicLoginComplete);
            this.vent.bind('session:loggedin', this.onLoginSuccess);
            this.vent.bind('session:loggedout', this.onLogout);
        },
        
        
        onPostStartup: function() {
            this.requestPublicWebSocketLogin();
            var cookieFound = this.checkForCookie();
            if (!cookieFound) {
                this.vent.trigger('session:publicLogin');
            }
        },
        
        onWSPublicLoginComplete: function() {
            this.startTimer();
        },
        
        checkForCookie: function() {
            var loginData = $.cookies.get(this.cookieName);
            if ( loginData ) {
                this.session.storeSessionFromCookie(loginData);
                this.validateExistingSessionToken();
                return true;
            }
            return false;
        },
        
        deleteCookie: function() {
            $.cookies.del(this.cookieName);
        },
        
        addCookie: function() {
            var currentSession = this.session.getSession();
            $.cookies.set(this.cookieName, currentSession);
        },
        
        validateExistingSessionToken: function() {
            this.commands.execute('command:getbalance')
                .done(this.onValidationSuccess)
                .fail(this.onValidationFailure);  
        },
        
        onValidationSuccess: function(data, textStatus, jqXHR) {
            this.vent.trigger('session:loggedin');
        },
                
        onValidationFailure: function(data, textStatus, jqXHR) {
             this.keepAliveApiStarted = false; 
             this.deleteCookie();
             this.session.clearSession();
        },
        
        onLoginSuccess: function() {
            this.keepAliveApiStarted = true;
            this.addCookie();
            this.loginUserToWebsocket();
        },
        
        onLogout: function() {
            this.keepAliveApiStarted = false;
            this.deleteCookie();
        },
        
        startTimer: function() {
            this.vent.trigger('app:log', 'Starting timer');
            if (!this.timerRunning) {
                window.setInterval(this.onTimerTick, this.eventTimerInterval, this);
                this.timerRunning = true;
            }
        },

        onTimerTick: function(scope) {
            scope.eventTimerCount++;

            if (scope.eventTimerCount == scope.keepAliveInterval) {
                scope.keepAliveWebSocket();
                scope.eventTimerCount = 0;
            }

            //Only keep Alive API when user logged in.
            if (scope.keepAliveApiStarted) {
                scope.keepAliveApiTimerCount++;
                if (scope.keepAliveApiTimerCount == scope.keepAliveApiInterval) {
                    scope.keepAliveApi();
                    scope.keepAliveApiTimerCount = 0;
                }
            }

            scope.triggerTimerEvent();
        },

        //Global Timer Event for Scoreboard timers etc etc.
        triggerTimerEvent: function() {
            this.vent.trigger('app:timer');
        },

        keepAliveApi: function() {
          this.apiService.keepAlive(this.session.getSessionToken());
        },

        keepAliveWebSocket: function() {
            this.socketService.keepAlive();
        },
        
        requestPublicWebSocketLogin: function() {
            this.socketService.requestPublicLogin(false);
        },
        
        loginUserToWebsocket: function() {
            this.socketService.loginUserToWebSocket();
        }

    });
});


