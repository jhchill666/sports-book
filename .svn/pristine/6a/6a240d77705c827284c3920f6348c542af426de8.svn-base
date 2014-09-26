/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['underscore', 'backbone', 'marionette'],
function(_, Backbone, Marionette) {
    return Marionette.Controller.extend({
        name: 'Command',


        /**
         * Executes the main command logic
         */
        execute: function(){

        },


        /**
         * @param resp
         */
        success: function(resp){

        },


        /**
         * @param resp
         */
        error: function(resp){

        },


        /**
         *
         */
        always: function(){

        },


        /**
         * Internal methods ------------------------------
         */

        initialize: function(){
            _.bindAll(this, 'execute', 'success', 'error', '_execute', '_success', '_error');
        },


        /**
         * Internal calls the 'execute' method, applying the original arguments
         * list to it.  If the execute method returns a Promise, then _success
         * and _error handlers are automatically applied, and subsequently invoked
         * when the appropriate response is determined.  'Success' and 'Error'
         * handlers are then invoked, providing a hook for user defined Command
         * success/error handlers.
         * @returns {*}
         * @private
         */
        _execute: function(){
//            console.log('Command: '+this.name+':execute');
            return this.execute.apply(this, arguments);
        },


        _success : function (resp) {
            console.log('Command: '+this.name+':success');
            this.success.call(this, resp);
        },


        _error: function (er) {
            console.log('Command: '+this.name+':error');
            this.error.call(this, er);
        },


        _always: function () {
            this.always.call(this, arguments);
        }
    });
});
