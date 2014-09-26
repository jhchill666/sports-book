/**
 * Created by Jamie on 05/09/2014.
 */
define(function (require) {
    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        tpl = require('text!app/route/RegionRouter.tpl.html'),
        HrefUtil = require('common/util/HrefUtil'),
        ctx = require('ctx');


    /**
     * Override constructor to enable appRoutes to be passed in
     * @type {*|void}
     */
    var Router = Marionette.AppRouter.extend({
        constructor: function (options) {
            Backbone.Router.apply(this, arguments);

            this.options = options || {};
            this.appRoutes = Marionette.getOption(this, 'appRoutes');

            if (this.appRoutes) {
                var controller = Marionette.getOption(this, "controller");
                this.processAppRoutes(controller, this.appRoutes);
            }
        }
    });


    /**

     [{
            sport: 'SOCCER',
            params: {},
            routes: {
                "matchHighlightsView" : "market-highlights",
                "eventScheduleView" : "market-h2h"
            }
         },
     {
        sport: 'BASEBALL',
        params: {},
        routes: {
            "eventScheduleView" : "market-h2h"
        }
     }]

     */



    var Layout = Marionette.LayoutView.extend({


        template: _.template(tpl),
        displayLoader: false,
        cachedRegions: null,
        appRoutes: {},


        /**
         * Bind all public methods to this scope
         */
        initialize: function(){
            _.bindAll(this, 'renderViews');
            this.router = new Router({appRoutes: this.appRoutes, controller: this});
        },


        /**
         * @returns {{listItems: *}}
         */
        templateHelpers: function(){
            return {listItems: this.listItems};
        },


        /**
         * Redraw the view with the specified regions
         * @param modules
         * @param params
         */
        redraw: function(modules, options) {
            options = options || {};
            this._checkLocale();

            var params = _.defaults(options, App.globals.get()),
                groups = this._parseModules(modules, params);

            // if a render is not required - ie. the new regions
            // match the current regions - then abort the operation
            if (!this.renderRequired(groups)) {
                this.reRender(groups);
                return;
            }

            this.renderTemplate(groups);
            this.renderViews(groups);
        },


        /**
         * @param groups
         * @returns {boolean}
         */
        renderRequired: function(groups) {
            var required = this._getRegions(groups);

            // if the regions haven't changed, return
            // false so that the re-render is aborted
            if (_.isEqual(required, this.cachedRegions))
                return false;

            var current = _.pluck(this.getRegions(), 'name'),
                that    = this;

            // then filter out which regions are no longer required
            var obsolete = _.filter(current, function(region) {
                return !_.contains(_.keys(required), region);
            });

            // finally removing the regions for each obsolete region
            _.each(obsolete, function(region) {
                that.removeRegion(region);
            });

            this.cachedRegions = required;
            return true;
        },


        /**
         * @param groups
         */
        renderTemplate: function(groups) {
            var regions = this._getRegions(groups),
                that = this;

            // supply the list of selector names to listItems,
            // so that the templateHelpers can render correctly
            this.listItems  = _.values(regions);

            // add required regions to the layout
            _.each(regions, function(val, key) {
                that.addRegion(key, "#"+val);
            });

            // then render
            this.render();
        },


        /**
         * @param groups
         */
        renderViews: function(groups){
            this._monitorRegions();
            var that = this;

            // again iterate through each group to instantiate our
            // views before adding each to the correct region
            _.each(groups, function(group){
                var append = _.has(group.params, 'append');

                _.each(group.routes, function (val, key) {

                    var view, region = (append) ? key + group.sport : key;

                    if (App.globals.singleViews == false)
                        view = ctx.create(key, group.params);
                    else {
                        view = ctx.get(key);
                        _.extend(view.options, group.params);
                    }

                    // and display the view in it's region
                    that[region].show(view, {forceShow: true});
                });
            });
        },


        reRender: function(groups) {
            var regions = this._getRegions(groups, true),
                that = this;

            _.each(regions, function (val, key) {
                var region = that[key],
                    view = region.currentView;

                // break out if no view
                if (_.isUndefined(view)) return;

                // update with the latest options
                _.extend(view.options, val.params);

                // and re-render the view
                region.show(view, {forceShow: true});
            });
        },


        /**
         * Private methods
         */


        /**
         * Returns an array of required regions by name
         * @param groups
         * @param advanced
         */
        _getRegions: function(groups, advanced) {
            var regions = {}, that = this;

            _.each(groups, function(group) {

                var sport  = group.sport.toLowerCase(),
                    append = _.has(group.params, 'append');

                _.each(group.routes, function (val, key) {

                    var name     = (append) ? key + group.sport : key,
                        selector = (append) ? val + '-' + sport : val;

                    // if advanced, return all properties
                    var value = (advanced) ?
                        { selector:selector, params: group.params, sport: sport } : selector;

                    regions[name] = value;
                });
            });

            return regions;
        },


        /**
         * Checks whether the route has a query string appended specifying a specific locale to use
         */
        _checkLocale: function() {
            var query  = HrefUtil.getQueryParams(),
                locale = (query) ? query.locale : null;
            App.globals.setLocale(locale);
        },


        /**
         * @param modules
         * @returns {*}
         */
        _parseModules: function(modules, params) {
            // if modules is an array, that all well and good. If
            // not create an array using the objects properties
            if (_.isArray(modules))
                return modules;
            else {
                return [{
                    sport: App.globals.sport,
                    params: params,
                    routes: modules,
                    append: false
                }];
            };
        },

        /**
         * Monitors each regions for a 'show' event.  Once all
         * regions have shown themselves, hides the 'loading visuals
         */
        _monitorRegions: function() {
            if (!this.displayLoader) return;
            this._showLoader();

            var regions = this.regionManager._regions,
                total   = _.size(regions),
                that    = this;

            _.each(regions, function(r) {
                that[r.name].once('show', function() {
                    total --;
                    if (_.size(total) == 0) {
                        that._hideLoader();
                    }
                })
            });
        },


        /**
         * Show the 'loading' white balls
         */
        _showLoader: function() {
            $("#content-loading").show();
        },


        /**
         * Hide the balls
         */
        _hideLoader: function() {
            $("#content-loading").delay(500).fadeOut(300);
        }
    });

    return Layout;
});