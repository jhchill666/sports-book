define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * @returns {*}
         */
        execute: function(){
            return ctx.get('apiService').logout();
        },

        /**
         * Clear session regardless of outcome
         */
        always: function(){
            ctx.get('sessionModel').clearSession();
        }
    });
});