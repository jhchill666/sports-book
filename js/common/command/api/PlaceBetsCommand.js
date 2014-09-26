define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function(bets){
            var service = ctx.get('apiService');
            var sessionToken = ctx.get('sessionModel').getSessionToken();
            return service.placeBets( sessionToken, bets );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'PlaceBetsResponse')){
                var betsModel = ctx.get('betsModel');
                
                if ( _.has(resp.PlaceBetsResponse, "newBalance")) {
                    var newBalance = resp.PlaceBetsResponse.newBalance;
                    var sessionModel = ctx.get('sessionModel');
                    var accountBalance = {};
                    accountBalance.value = newBalance.amount;
                    accountBalance.currency = '£'; //TODO newBalance.currency == GBP
                    sessionModel.setBalance(accountBalance);     
                }   
                
                var betPlacementArray = resp.PlaceBetsResponse.betPlacementResult;
                    
                for (var i = 0; i < betPlacementArray.length; i++) {
                    var betResult = betPlacementArray[i];
                    if (betResult.status == 'ACCEPTED' || betResult.status == 'OVER_ASK') {
                        betsModel.setAcceptedBetResult(betResult);
                    }
                    else {
                        betsModel.setRejectedBetResults(betResult);
                    }
                }
                    
            }
        },
        
        error: function(resp) {
            
        }
        
    });
});