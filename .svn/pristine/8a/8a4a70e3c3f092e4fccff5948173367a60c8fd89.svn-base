// Main Marionette application module, exports application instance to the outside world
define(['common/bootstrap/core/DeferredBase'],
    function(DeferredBase) {
    return DeferredBase.extend({
        name: 'DummyDeferred',

        /**
         * Override to add defered functionality.  This DummyDeferred, simply
         * chooses a random 'success' or 'failure' outcome, and invokes after 2 seconds
         */
        init: function(){
            var random = Math.round(Math.random()),
                method = (random == 1) ? 'success' : 'failure';
            _.delay(this[method], 2000);
        }
    });
});