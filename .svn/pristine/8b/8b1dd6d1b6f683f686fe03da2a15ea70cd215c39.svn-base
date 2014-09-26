define([
    'common/bootstrap/core/DeferredBase',
    'ctx'
],
function (DeferredBase, ctx) {
    return DeferredBase.extend({
        name: 'RouterConfig',

        /**
         * Set up the IoC context
         */
        init: function() {

            // Set application fragments
            App.url     = window.location.host;
            App.path    = window.location.pathname;

            // Dump properties
            console.log('Bootstrap: '+this.name+' - url: '+App.url+', path: '+App.path);

            // Initialise the top level router
//            new AppRouter({ controller : ctx.get('appRouterController')});

            // Start-up Backbone.History
//            Backbone.history.start({ pushState: true, hashChange: false, root: App.path });
//            Backbone.history.start({ pushState: false, hashChange: true });


            // initialise the context
//            ctx.initialize();
            // then kick off the routing
//            Backbone.history.start({ pushState: false, hashChange: true, root: App.path });

            this.success();
        }
        
    })
});



