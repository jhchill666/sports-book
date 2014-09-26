define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function( sport, channelId, locale ){
            var service = ctx.get('apiService');
            return service.getSportDisplayTemplate( sport.toUpperCase(), channelId, locale  );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'SportDisplayTemplate')){
                var model = ctx.get('marketGroupsModel'),
                    templates = resp.SportDisplayTemplate.markettemplate,
                    sport = resp.SportDisplayTemplate.sportCode;
                model.parse(templates, sport);
            }
        }
    });
});


