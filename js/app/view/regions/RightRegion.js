/**
 * Created by Jamie on 05/09/2014.
 */
define(['app/route/RegionRouter', 'ctx'], function (RegionRouter, ctx){
    return RegionRouter.extend({
        template: _.template("<ul><li id='IPVpanel'></li><li id='bet-slip-panel'></li></ul>"),


        appRoutes: {
            '*splat' : 'onHome'
        },


        /**
         * @param locale
         * @param sport
         */
        onHome: function(){
            var fragment = Backbone.history.getFragment();
            if (fragment === '')
                this.redraw({"betSlipView": "bet-slip-panel"});

            else {

                var sport = fragment.split('/')[0];
                App.globals.setSport(sport);

                this.redraw(this.getModules(sport));
            }
        },


        /**
         * @returns {{}}
         */
        getModules: function(sport){
            var ipv;
            switch (sport.toLowerCase()) {
                case "baseball":
                    ipv = {'IPVpanelBaseball':'IPVpanel'};
                    break;

                case "basketball":
                    ipv = {'IPVpanelBasketball':'IPVpanel'};
                    break;
                default:
                    ipv = "IPVpanelFootball";
                    ipv = {'IPVpanelFootball':'IPVpanel'};
                    break;
            }

            return _.defaults(ipv, {'betSlipView': 'bet-slip-panel'});
        }
    });
});