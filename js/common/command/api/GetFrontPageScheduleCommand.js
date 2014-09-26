define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({


        /**
         * @param channelId
         * @param locale
         * @returns {*}
         */
        execute: function( channelId, locale ){
            return ctx.get('apiService')
                .getFrontPageSchedule(channelId, locale);
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'FrontPageSchedule')) {
                var model = ctx.get('frontPageModel');
                model.parseSchedules(resp.FrontPageSchedule.sports, true);
            }
        }
    });
});



