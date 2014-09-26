define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @param user
         * @param pass
         * @returns {*}
         */
        execute: function(user, pass){
            var service = ctx.get('apiService');
            return service.login(user, pass);
        },


        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Login')){
                ctx.get('sessionModel').storeSession(resp.Login);
            }
        },
        
        error: function(resp) {
            ctx.get('sessionModel').clearSession();
        },

    });
});