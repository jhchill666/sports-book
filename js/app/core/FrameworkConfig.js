define(['marionette', 'backbone', 'backbone.wreqr', 'backbone.command', 'common/bootstrap/core/DeferredBase'],
function (Marionette, Backbone, Wreqr, Command, DeferredBase) {


    /**
     * Overrides the WReqR Command execute method to return Promises
     * @param name
     * @param args
     * @returns {*}
     */
    Wreqr.Commands.prototype.execute = function(name, args) {
        name = arguments[0];
        args = Array.prototype.slice.call(arguments, 1);
        if (this.hasHandler(name)) {
            var callback = this._wreqrHandlers[name].callback,
                command  = callback.prototype;
                command.name = name;

            var promise = command._execute.apply(command, args);
            if (!_.isUndefined(promise)) {
                return promise.done(function(resp){
                    var action = _.has(resp, 'Error') ?
                        '_error' : '_success';
                    Command.prototype[action].apply(command, arguments);
                }).fail(function(){
                    Command.prototype._error.apply(command, arguments);
                }).always(function(){
                    Command.prototype._always.apply(command, arguments);
                });
            }
        } else {
            this.storage.addCommand(name, args);
        }
    };


    /**
     * Augments Backbone.History to dispatch route change events,
     * and also trigger multiple route change handlers.  The native
     * backbone 'loadUrl' method uses '_.any' which breaks out of the
     * loop as soon as it finds a matching handler.  We want to invoke
     * all matching handlers, so prevent the loop from being broken out
     * of by using the _.each instead
     * @param fragment
     * @returns {*}
     */
    Backbone.History.prototype.loadUrl = function(fragment){
        fragment = this.fragment = this.getFragment(fragment);

        // create a map of handlers that match this route
        var callbacks = _.filter(this.handlers, function(handler) {
            return handler.route.test(fragment);
        });

        var matched = !!_.size(callbacks);
        if (matched) {
            // fire off before:routeChange
            App.core.vent.trigger('router:before:routeChange', fragment);

            // then action all the matched handlers
            _.each(callbacks, function(handler) {
                handler.callback(fragment);
            });

            // trigger main routeChange event and dump to console
            App.core.vent.trigger('router:routeChange', fragment);
            console.log('Router: RouteChange - '+fragment.toLowerCase());
        }

        return matched;
    };


    Marionette.RegionManager.prototype.addRegion = function(name, definition) {
        var region;

        var isObject = _.isObject(definition);
        var isString = _.isString(definition);
        var hasSelector = !!definition.selector;

        if (isString || (isObject && hasSelector)) {
            region = Marionette.Region.buildRegion(definition, Marionette.Region);
        } else if (_.isFunction(definition)) {
            region = Marionette.Region.buildRegion(definition, Marionette.Region);
        } else {
            region = definition;
        }

        this.triggerMethod('before:add:region', name, region);

        this._store(name, region);

        this.triggerMethod('add:region', name, region);
        region.name = name;
        return region;
    };


    Marionette.LayoutView.prototype.removeRegions = function(regions) {
        var that = this;
        _.each(regions, function(region) {
            that.removeRegion(region.name);
        })
    };


    Marionette.LayoutView.prototype.removeAllRegions = function() {
        var that = this;
        _.each(this.regions, function(region) {
            that.removeRegion(region.name);
        })
    };


    return DeferredBase.extend({
        name: 'FrameworkConfig',
        init: function() {
            this.success();
        }
    })
});
