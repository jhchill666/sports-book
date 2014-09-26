define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function( sport, channelId, locale ){
            var service = ctx.get('apiService');
            return service.getSportSchedule( sport.toUpperCase(), channelId, locale  );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Sport')){
                var model = ctx.get('frontPageModel');
                model.parseSchedule(resp.Sport);
            }
        }
    });
});



