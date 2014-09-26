/**
 * Created by Jamie on 05/09/2014.
 */
define(['backbone', 'app/route/RegionRouter', 'ctx', 'moment'], function (Backbone, RegionRouter, ctx, moment){
    return RegionRouter.extend({


        dependencies: 'frontPageModel',
        displayLoader: true,


        appRoutes: {
            '(/)'                                              : 'onHome',

            ':sport(/)'                                        : 'onEvents',
            ':sport/today(/)'                                  : 'onEventsToday',
            ':sport/tomorrow(/)'                               : 'onEventsTomorrow',

            ':sport/event/:id(/)'                              : 'onEvent',
            ':sport/competition/:id(/)'                        : 'onCompetition',
            ':sport/coupon/:id(/)'                             : 'onCoupon',
            ':sport/country/:id(/)'                            : 'onCountry'
        },


        /**
         *
         */
        onHome: function() {
            var options = this._extractMoment('today', {append: true}),
                modules = this.getHomeModules();
            this.redraw(modules, options);
        },


        /**
         * @param locale
         * @param sport
         */
        onEvent: function(sport, id){
            App.globals.setSport(sport);

            var modules = this.getEventModules(sport);
            this.redraw(modules, {eventId: id});
        },


        /**
         * @param locale
         * @param sport
         */
        onEvents: function(sport){
            this.redrawEvents(sport);
        },


        /**
         * @param sport
         */
        onEventsToday: function(sport) {
            this.redrawEvents(sport, 'today');
        },


        /**
         * @param sport
         */
        onEventsTomorrow: function(sport) {
            this.redrawEvents(sport, 'tomorrow');
        },


        /**
         * Competitions
         */


        /**
         * @param locale
         * @param sport
         * @param competitionId
         */
        onCompetition: function(sport, id) {
            App.globals.setSport(sport);

            var modules = this.getCompetitionModules(sport);
            this.redraw(modules, {competitionId: id});
        },

        /**
         * Coupons
         */


        /**
         * @param locale
         * @param sport
         * @param couponId
         */
        onCoupon: function(sport, id) {
            App.globals.setSport(sport);

            var modules = this.getCouponModules(sport);
            this.redraw(modules, {couponId: id});
        },


        /**
         * @param locale
         * @param sport
         * @param countryId
         */
        onCountry: function(sport, id) {
            App.globals.setSport(sport);

            var modules = this.getCountryModules(sport);
            this.redraw(modules, {countryId: id});
        },


        /**
         *
         */
        onNotFound: function() {
            var fragment = Backbone.history.getFragment();
            this.redraw({'notFoundView': 'main-inplay'});
        },


        /**
         * Private
         */


        /**
         * @param sport
         */
        redrawEvents: function(sport, day) {
            var moment  = this._extractMoment(day),
                options = _.extend(moment, {append: true});

            App.globals.setSport(sport);
            this.redraw({
                'matchHighlightsView'                           : 'market-highlights',
                'eventScheduleView'                             : 'market-h2h',
                'topMatchesView'                                : 'market-top5',
                'competitionsView'                              : 'market-competitions',
                'couponsView'                                   : 'market-coupons',
                'countriesView'                                 : 'market-countries'
            }, options);
        },


        /**
         * Returns the homne page modules
         * @param sport
         * @returns {{}}
         */
        getHomeModules: function() {
            return {'sportsScheduleView' : 'market-h2h'};
        },


        /**
         * Returns the event modules required by sport
         * @param sport
         * @returns {{}}
         */
        getEventModules: function(sport){
            var modules = {};
            switch (sport.toUpperCase()) {
                case 'SOCCER':
                    modules = {
                        'inplayViewFootball': 'main-inplay',
                        'marketGroupsView': 'market-groups',
                        'marketsView': 'all-markets'
                    };
                    break;

                case 'BASEBALL':
                    modules = {
                        'inplayViewBaseball': 'main-inplay',
                        'marketsView': 'all-markets'
                    };
                    break;

                case 'BASKETBALL':
                    modules = {
                        'inplayViewBasketball': 'main-inplay',
                        'marketsView': 'all-markets'
                    };
                    break;
                default:
                    modules = {
                        'marketsView': 'all-markets'
                    };
                    break;
            }

            return modules;
        },


        /**
         * Returns the competition modules required by sport
         * @param sport
         * @returns {{}}
         */
        getCompetitionModules: function(sport) {
            var modules = {};
            switch (sport.toUpperCase()) {
                case 'SOCCER':
                    modules = {
                        'competitionEventView': 'competition-markets'
                    };
                    break;

                case 'BASEBALL':
                    modules = {
                        'competitionEventView': 'competition-markets'
                    };
                    break;

                case 'BASKETBALL':
                    modules = {
                        'competitionEventView': 'competition-markets'
                    };
                    break;
                default:
                    modules = {
                        'competitionEventView': 'competition-markets'
                    };
                    break;
            }

            return modules;
        },


        /**
         * Returns the coupon modules required by sport
         * @param sport
         * @returns {{}}
         */
        getCouponModules: function(sport) {
            var modules = {};
            switch (sport.toUpperCase()) {
                case 'SOCCER':
                    modules = {
                        'couponsEventView': 'coupons-markets'
                    };
                    break;

                case 'BASEBALL':
                    modules = {
                        'couponsEventView': 'coupons-markets'
                    };
                    break;

                case 'BASKETBALL':
                    modules = {
                        'couponsEventView': 'coupons-markets'
                    };
                    break;
                default:
                    modules = {
                        'couponsEventView': 'coupons-markets'
                    };
                    break;
            }

            return modules;
        },


        /**
         * Returns the coupon modules required by sport
         * @param sport
         * @returns {{}}
         */
        getCountryModules: function(sport) {
            var modules = {};
            switch (sport.toUpperCase()) {
                case 'SOCCER':
                    modules = {
                        'countriesEventView': 'countries-markets'
                    };
                    break;

                case 'BASEBALL':
                    modules = {
                        'countriesEventView': 'countries-markets'
                    };
                    break;

                case 'BASKETBALL':
                    modules = {
                        'countriesEventView': 'countries-markets'
                    };
                    break;
                default:
                    modules = {
                        'countriesEventView': 'countries-markets'
                    };
                    break;
            }

            return modules;
        },


        /**
         * Extracts the start/end moments for the specified route period
         * @param period
         * @param options
         * @private
         */
        _extractMoment: function(period) {
            var day, options = {};

            switch(period) {
                case 'tomorrow':
                    day = moment().add(1, 'day');
                    break;
                case 'today':
                    day = moment();
                    break;
            }


            // if we have a valid day, augment options with start and end times
            if (typeof day !== 'undefined') {
                var start = moment(day).startOf('day'),
                    end   = moment(day).endOf('day');

                _.extend(options, {eventStart: start, eventEnd: end});
            }

            return options;
        }
    });
});