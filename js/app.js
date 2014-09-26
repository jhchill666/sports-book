define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'app/core/Globals',
    'ctx',
    'moment',
    'modal',
    'app/core/Bootstrap',
    'app/view/AppView'
],
function($, _, Backbone, Marionette, Globals, ctx, moment, Modal, Bootstrap, AppView) {

    // Main application
    var core = new Marionette.Application();

    // Core definitions


    // Required bootstrapping to be added here
    core.on("before:start", function(options) {
        core.vent.trigger('app:log', 'App: Initializing');
        core.bootStart = moment();

        // Perform app bootstrap sequence
        var bootstrap = new Bootstrap({app: core});
        bootstrap.deferred.done(function() {
            core.vent.trigger('app:start');
            ctx.initialize();
        });
    });


    // Post startup steps such as auto log in etc.
    core.on("start", function(options) {
        core.vent.trigger('app:log', 'App: Initialized');
        core.vent.trigger('application:complete');
        Backbone.history.start({ pushState: false, root: App.path });
    });


    // Once all pre-initialization and bootstrapping has been completed,
    // we need to start up the Backbone.History and add the main view
    // to the mainRegion.
    core.vent.bind('app:start', function(options) {
        core.vent.trigger('app:log', 'App: Starting');
        core.container.show(new AppView());

        core.bootFinish = moment();
        core.bootDuration = core.bootFinish.diff(core.bootStart, 'seconds', true);

        // Now up and views and render for base app here...
        core.vent.trigger('app:log', 'App: StartUp completed in ' + core.bootDuration + 's');
    });


    // Console shortcut
    core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    // Console shortcut
    core.vent.bind('app:unavailable', function(msg) {
        alert("Service Error")
        var popup = ctx.get('messagePopup');
        $(this.modalEl).attr('class', '');
        $(this.modalEl).addClass('messagePopup');
        $(this.modalEl).html(popup.render().el);
    });


    // Set up the display region
    core.addRegions({
        container: "#container"
    });


    // Module definitions


    // Expose application core to the outside world
    App = {
        core: core,
        appName: 'Sportsbook',
        globals: new Globals({vent: core.vent}),
        start: function(options) {
            core.start(options);
        }
    };

    return App;
});

