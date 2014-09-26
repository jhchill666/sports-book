define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function( sports ){
            if (_.isUndefined(sports)) return;

            var service = ctx.get('apiService');
            var allSports = _.map(sports.split(','), function(sport) {
                return sport.toUpperCase();
            });

            return service.getKeyMarketsForSports(allSports.join(','));
        },


        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Attributes')){
                var model = ctx.get('keyMarketsModel'),
                    sports = resp.Attributes.attrib;

                _.each(sports, function(obj) {
                    var sport = obj.key.toLowerCase(),
                        markets = obj.value.split(',');
                    model.parse(sport, markets);
                }, this);
            }
        }
    });
});

