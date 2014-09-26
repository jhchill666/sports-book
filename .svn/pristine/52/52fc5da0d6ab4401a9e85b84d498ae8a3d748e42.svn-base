define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function( competitionId, channelId, locale ){
            var service = ctx.get('apiService');
            return service.getCompetitionEvents( competitionId, channelId, locale  );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Competition')){
                var model = ctx.get('eventScheduleModel');
                model.setCompetitionEvents(resp.Competition.event);
            }
        }
        
        
    });
});
