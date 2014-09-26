/**
 * Created by Jamie on 05/09/2014.
 */
define(['app/route/RegionRouter', 'ctx'], function (RegionRouter, ctx){
    return RegionRouter.extend({


        appRoutes: {
            '*splat' : 'onHome'
        },


        /**
         *
         */
        onHome: function(){
            var fragment = Backbone.history.getFragment();
            if (fragment === '') {
                this.redraw({
                    "allSport": "side-left-sport"
                });
            }

            else {

                var sport = fragment.split('/')[0];
                App.globals.setSport(sport);

                this.redraw({
                    "navSport": "side-left-sport",
                    "inPlay": "side-left-inplay",
                    "competitions": "side-left-competitions",
                    "countriesView": "side-left-countries"
                })
            }
        }
    });
});