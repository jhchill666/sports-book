define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function( eventId, channelId, locale ){
            var service = ctx.get('apiService');
            return service.getEvent( eventId, channelId, locale  );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Event')){
                var model = ctx.get('eventDetailsModel');
                var event = resp.Event;
                model.setEventDetails(event);
            }
        }
        
        
    });
});


