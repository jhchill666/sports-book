define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function(){
            var service = ctx.get('apiService');
            var sessionToken = ctx.get('sessionModel').getSessionToken();
            return service.getBalance( sessionToken );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'AccountBalance')){
                ctx.get('sessionModel').setBalance(resp.AccountBalance);
            }
        },
        
//        error: function(resp) {
//            
//        },
//        
//        always: function(){
//            //ctx.get('sessionModel').clearSession();
//        }
        
    });
});


