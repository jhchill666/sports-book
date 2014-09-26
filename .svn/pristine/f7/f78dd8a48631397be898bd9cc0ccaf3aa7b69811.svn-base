define(function (require) {

    var Marionette = require('marionette');

    return Marionette.Controller.extend({
        
        dependencies: 'url=wsendpoint, session=sessionModel, appid, vent',
        
        connection:null,
        pendingMessages: [],
        
        connect: function() {
            var scope = this;
            var WS = window.MozWebSocket ? window.MozWebSocket : WebSocket;
            
            if ( !WS ) {
                this.vent.trigger('app:log', 'Websocket not supported');
                return;
            }
            
            if ( !this.connection ) {
                this.connection = new WS( this.url );
                
                this.connection.onopen = function() {
                    scope.vent.trigger('app:log', 'Websocket is now open');
                    scope.sendPendingMessages();
                };
                
                this.connection.onerror = function(event) {
                    scope.throwError( 'There is a problem with the WebSocket' );
                };
                
                this.connection.onmessage = function(event) {
                    var data = JSON.parse(event.data);
                    if ( data.error ) {
                        scope.throwError(data.error);
                        return;
                    }
                    
                    scope.parseMessage( data );
                    
//                    setTimeout(function() {
//                        scope.publishStreamingMessage( data );
//                    }, 0);
                };
            }
            
        },
        
        send: function(data) {
            try {
                this.connection.send(data);
            }
            catch (e) {
                this.pendingMessages.push(data);
            }
        },
        
        sendPendingMessages: function() {
            for (var i in this.pendingMessages) {
                this.send( this.pendingMessages[i] );
            }
            this.pendingMessages = [];
        },
        
        //Abstract method. Override in Subclass.
        parseMessage: function( data ) {
        },
        
        throwError: function( message ) {
            this.vent.trigger('app:unavailable', 'Service unavailable, please try later');
            this.vent.trigger('app:log', 'There is a problem with the Websocket.');
        },
        
        ready: function(options){
            
        }

    });
});


