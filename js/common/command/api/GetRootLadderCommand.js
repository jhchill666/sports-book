define(['backbone.command', 
    'ctx'

], function (Command, ctx){
    return Command.extend({

        execute: function(){
            var service = ctx.get('apiService');
            return service.getRootLadder();
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'PriceAdjustmentDetailsResponse')){
                var rootLadder = resp.PriceAdjustmentDetailsResponse.rootLadder;
                
                var oddsFactory = ctx.get('oddsFactory');
                oddsFactory.setOddsLadder(rootLadder);
                oddsFactory.setPriceAdjustment(0);   
            }
        }
    });
});