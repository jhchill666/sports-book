// Main Marionette application module, exports application instance to the outside world
define(['backbone'],
    function(Backbone) {
    return Backbone.Model.extend({
        name: 'DeferredBase',


        /**
         * Initialize the Deferred object
         * @param options
         */
        initialize:function (options) {
            _.bindAll(this, 'success', 'failure');
            this.options = options;
            this.deferred = $.Deferred();
            this.init();
        },


        /**
         * Override to add defered functionality
         */
        init: function(){

        },


        /**
         * Should be called when the async operation completes successfully
         * @param data
         */
        success: function(data){
            console.log('Bootstrap: '+this.name+' - Success');
            this.deferred.resolve(data);
        },


        /**
         * Should be called when the async operation fails
         * @param data
         */
        failure: function(data){
            console.log('Bootstrap: '+this.name+' - Failure');
            this.deferred.reject(data);
        }

    });
});