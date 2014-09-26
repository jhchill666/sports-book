define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function(){
            var service = ctx.get('apiService');
            var sessionToken = ctx.get('sessionModel').getSessionToken();
            return service.getOpenBets( sessionToken );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Bets')){
                var betsModel = ctx.get('betsModel');
                var filteredBets = _.filter(resp.Bets.bet, 
                    function(bet) { 
                        return bet.betStatus == 'ACCEPTED';
                });
                
                betsModel.setOpenBetsResult(filteredBets);
            }
        },

        error: function(resp) {

        }

    });
});