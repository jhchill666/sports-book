define(['backbone.command', 
    'ctx'

], function (Command, ctx){
    return Command.extend({

        execute: function(){
            var service = ctx.get('apiService');
            var sessionToken = ctx.get('sessionModel').getSessionToken();
            return service.getPriceAdjustmentDetails( sessionToken );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'PriceAdjustmentDetailsResponse')){
                var adjustment = resp.PriceAdjustmentDetailsResponse.priceAdjustment;
                var rootLadder = resp.PriceAdjustmentDetailsResponse.rootLadder;
                
                
                var oddsFactory = ctx.get('oddsFactory');
                if (_.isUndefined(oddsFactory)) {
                    console.log('ERROR: OddsFactory is undefined');
                }
                
                oddsFactory.setOddsLadder(rootLadder);
                oddsFactory.setPriceAdjustment(adjustment);   
            }
        },
        
        
    });
});