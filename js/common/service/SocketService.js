define(function(require) {
    var ATSWebSocket = require('common/framework/service/ATSWebSocket');
    return ATSWebSocket.extend({
        
        PUBLIC_LOGIN_REQ_ID: 0,
        KEEP_ALIVE_REQ_ID: 1,
        USER_LOGIN_REQ_ID: 2,
        
        defaults: {
            sessionToken: function() {
                return this.session.getSessionToken();
            },
            application: function() {
                return this.appid;
            }
        },
        
        keepAlive: function() {
            this.send('{KeepAlive:{reqId:' + this.KEEP_ALIVE_REQ_ID + '}}');
        },
        
        ready: function(options) {
            this.connect();
        },
        
        parseMessage: function(data) {
            //this.vent.trigger('app:log', 'WS DATA RECEIVED ' + JSON.stringify(data));
            if (_.has(data, 'Response')) {
                var status = data.Response.status;
                var lowerError = status.toLowerCase();
                if (lowerError == 'error') {
                    this.throwError('There is a problem with the WebSocket');
                    return;
                }
                var reqId = data.Response.reqId;
                if (reqId == this.PUBLIC_LOGIN_REQ_ID) {
                    this.vent.trigger('websocket:publicLoginComplete');
                    return;
                }
                else if (reqId == this.KEEP_ALIVE_REQ_ID) {
                    return;
                }
            }
            this.publishStreamingMessage(data);
        },
        
        publishStreamingMessage: function(data) {
            if (data.PushMsg) {
                if (data.PushMsg.eventTradingState) {
                    this.trigger("websocket:eventTradingState", data.PushMsg.eventTradingState);
                } else if (data.PushMsg.incidents) {
                    this.trigger("websocket:incidents", data.PushMsg.incidents);
                }
                else if (data.PushMsg.event) {
                   this.trigger("websocket:event", data.PushMsg.event);
                }
            } 
            else if (data.SubscribeResponse) {
                this.trigger("websocket:subscribeResponse", data.SubscribeResponse);
            } 
            else if (data.ScheduleAmendment) {
                this.trigger("websocket:scheduleAmendment", data.ScheduleAmendment);
            }
        },
        
        loginUserToWebSocket: function() {
            var UpgradePublicLoginRequest = {};
            UpgradePublicLoginRequest.userName = this.session.getName();
            UpgradePublicLoginRequest.accountId = this.session.getAccountId();
            UpgradePublicLoginRequest.apiSessionToken = this.session.getSessionToken();
            UpgradePublicLoginRequest.reqId = this.USER_LOGIN_REQ_ID;

            var obj = {};
            obj.UpgradePublicLoginRequest = UpgradePublicLoginRequest;
            this.send(JSON.stringify(obj));

        },
        
        requestPublicLogin: function() {
            this.vent.trigger('app:log', 'WS Request public login');
            var PublicLoginRequest = {};
            PublicLoginRequest.application = this.appid;
            PublicLoginRequest.locale = 'en-gb';
            PublicLoginRequest.channel = 'INTERNET';
            PublicLoginRequest.reqId = this.PUBLIC_LOGIN_REQ_ID;
            PublicLoginRequest.apiVersion = 2;

            var obj = {};
            obj.PublicLoginRequest = PublicLoginRequest;
            this.send(JSON.stringify(obj));
        }
    });
});


