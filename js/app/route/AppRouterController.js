define(function(require) {

    var Marionette = require('marionette');
    var Backbone = require('backbone');

    return Marionette.Controller.extend({
        dependencies: 'commands, vent, apiService, mainView, leftPanelView, rightPanelView',
        ready: function(options) {
            var that = this;

            this.apiService.getPageLayout().done(function(resp) {
                if (resp.Layout == null)
                    return;

                that.layout = resp.Layout;
            });
        },
        
        onHomeRoute: function() {
        	$("#content-loading").show();
            Backbone.history.navigate(App.globals.locale + '/' + App.globals.sport, {trigger: true, replace: true});
        },

        onHomeSportRouteWithDefaultLocale: function(sport) {
        	$("#content-loading").show();
            Backbone.history.navigate(App.globals.locale + '/' + sport, {trigger: true, replace: true});
        },

        mainRouteModules: {
            "matchHighlightsView": "market-highlights",
            "eventScheduleView": "market-h2h",
            "topMatchesView": "market-top5",
            "competitionsView": "market-competitions",
            "couponsView": "market-coupons",
            "countriesView": "market-countries"
        },

        onHomeSportRoute: function(locale, sport) {
        
            this.checkGlobals(locale, sport);
            this.mainView.redraw(this.mainRouteModules);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);
        },
        
        
        onHomeSportRouteToday: function(locale, sport) {
        
            this.checkGlobals(locale, sport);
			var parameters = this.calculateDates(0);

            this.mainView.redraw(this.mainRouteModules, parameters);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);
        },

        onHomeSportRouteTomorrow: function(locale, sport) {

            this.checkGlobals(locale, sport);
            var parameters = this.calculateDates(1);

            this.mainView.redraw(this.mainRouteModules, parameters);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);
        },
        

        onEventdetails: function(locale, sport, eventId) {
        
            var modules = {};

            switch (sport) {
                case "SOCCER":
                    modules = {
                        "inplayViewFootball": "main-inplay",
                        "marketGroupsView": "market-groups",
                        "marketsView": "all-markets",
                    };
                    break;

                case "BASEBALL":
                    modules = {
                        "inplayViewBaseball": "main-inplay",
                        "marketsView": "all-markets",
                    };
                    break;

                case "BASKETBALL":
                    modules = {
                        "inplayViewBasketball": "main-inplay",
                        "marketsView": "all-markets",
                    };
                    break;
                default:
                    modules = {
                        "marketsView": "all-markets",
                    };
                    break;
            }

            this.checkGlobals(locale, sport);
            var parameters = {eventId: eventId};

            this.mainView.redraw(modules, parameters);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);

        },

        onCompetitionRoute: function(locale, sport, competitionId) {
        	
            var modules = {};

            switch (sport) {
                case "SOCCER":
                    modules = {
                        "competitionEventView": "competition-markets",
                    };
                    break;

                case "BASEBALL":
                    modules = {
                        "competitionEventView": "competition-markets",
                    };
                    break;

                case "BASKETBALL":
                    modules = {
                        "competitionEventView": "competition-markets",
                    };
                    break;
                default:
                    modules = {
                        "competitionEventView": "competition-markets",
                    };
                    break;
            }

            this.checkGlobals(locale, sport);
            var parameters = {competitionId: competitionId};

            this.mainView.redraw(modules, parameters);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);
        },

        onCouponRoute: function(locale, sport, couponId) {
            var modules = {};

            switch (sport) {
                case "SOCCER":
                    modules = {
                        "couponsEventView": "coupons-markets",
                    };
                    break;

                case "BASEBALL":
                    modules = {
                        "couponsEventView": "coupons-markets",
                    };
                    break;

                case "BASKETBALL":
                    modules = {
                        "couponsEventView": "coupons-markets",
                    };
                    break;
                default:
                    modules = {
                        "couponsEventView": "coupons-markets",
                    };
                    break;
            }

            this.checkGlobals(locale, sport);
            var parameters = {competitionId: couponId};

            this.mainView.redraw(modules, parameters);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);
        },

        onCountryRoute: function(locale, sport, countryId) {
            var modules = {};

            switch (sport) {
                case "SOCCER":
                    modules = {
                        "countriesEventView": "countries-markets",
                    };
                    break;

                case "BASEBALL":
                    modules = {
                        "countriesEventView": "countries-markets",
                    };
                    break;

                case "BASKETBALL":
                    modules = {
                        "countriesEventView": "countries-markets",
                    };
                    break;
                default:
                    modules = {
                        "countriesEventView": "countries-markets",
                    };
                    break;
            }

            this.checkGlobals(locale, sport);
            var parameters = {competitionId: countryId};

            this.mainView.redraw(modules, parameters);
            this.redrawRightPanel(sport);
            this.redrawLeftPanel(sport);
        },

        checkGlobals: function(locale, sport) {
            if (sport != App.globals.sport) {
                App.globals.sport = sport;
                this.vent.trigger('globals:sportChange',sport);
            }

            if (locale != App.globals.locale) {
                App.globals.locale = locale;
                this.vent.trigger('globals:localeChange',locale);
            }            
        },
        
        redrawLeftPanel: function(sport) {
            var modules = {
                "navSport": "side-left-sport",
                //"currentSport": "side-left-current-sport",
                "inPlay": "side-left-inplay",
                //"competitions": "side-left-competitions",
                //"countries": "side-left-countries",
            };

            this.leftPanelView.redraw(modules);
        },
        
        redrawRightPanel: function(sport) {

            var modules = {};

            switch (sport) {
                case "SOCCER":
                    modules = {
                        "IPVpanelFootball": "IPVpanel",
                    };
                    break;

                case "BASEBALL":
                    modules = {
                        "IPVpanelBaseball": "IPVpanel",
                    };
                    break;

                default:
                    modules = {
                        "IPVpanelBasketball": "IPVpanel",
                    };
                    break;
            }
            
			
            this.rightPanelView.redraw(modules);
        }


    });
});


