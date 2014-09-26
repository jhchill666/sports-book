define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function(from,to){
            var service = ctx.get('apiService');
            var sessionToken = ctx.get('sessionModel').getSessionToken();
            return service.getClosedBets( sessionToken, from, to );
        },

        success: function(resp){
            if (_.has(resp, 'Bets')){
                var betsModel = ctx.get('betsModel');
                betsModel.setClosedBetsResult(resp.Bets.bet);
            }
        }
        
        
    });
});