define(function(require){

    var DeferredBase = require('common/bootstrap/core/DeferredBase'),
        ctx = require('ctx'),
        HeaderView = require('app/view/header/HeaderView'),
        FooterView = require('app/view/footer/FooterView'),
        EventSchedulePM = require('app/view/main/schedule/EventSchedulePM'),
        SessionModel = require('app/model/SessionModel'),
        EventScheduleModel = require('app/model/EventScheduleModel'),
        FrontPageModel = require('app/model/FrontPageModel'),
        EventDetailsModel = require('app/model/EventDetailsModel'),
        MarketGroupsModel = require('app/model/MarketGroupsModel'),
        KeyMarketsModel = require('app/model/KeyMarketsModel'),
        AppViewPM = require('app/view/AppViewPM');
        
        ApiService = require('common/service/ApiService'),
        SocketService = require('common/service/SocketService'),
        AppController = require('app/control/AppController'),
        SubscriptionController = require('app/control/SubscriptionController'),
        EventModel = require('app/model/domain/EventModel'),

        EventCache = require('app/model/EventCache'),
        BetsModel = require('app/model/domain/BetsModel'),
        BetSlipView = require('app/view/bets/BetSlipView'),
        BetSlipPM = require('app/view/bets/BetSlipPM'),
        SingleBetView = require('app/view/bets/SingleBetView'),
        MultipleBetView = require('app/view/bets/MultipleBetView'),
        ConfirmationBetView = require('app/view/bets/ConfirmationBetView'),
        RejectedBetView = require('app/view/bets/RejectedBetView'),
        OpenBetsView = require('app/view/bets/OpenBetsView'),
        ClosedBetsView = require('app/view/bets/ClosedBetsView'),

        EventScheduleView = require('app/view/main/schedule/EventScheduleView'),
        SportsScheduleView = require('app/view/main/frontPage/SportsScheduleView'),
        SportsScheduleViewPM = require('app/view/main/frontPage/SportsScheduleViewPM'),
        MatchHighlightsView = require('app/view/main/highlights/MatchHighlightsView'),
        CompetitionsView = require('app/view/main/competitions/CompetitionsView'),
        CompetitionEventView = require('app/view/main/competitions/CompetitionEventView'),
        CouponsView = require('app/view/main/coupons/CouponsView'),
        CouponsEventView = require('app/view/main/coupons/CouponsEventView'),
        CountriesView = require('app/view/side/CountriesView'),
        CountriesEventView = require('app/view/main/countries/CountriesEventView'),

        TopMatchesView = require('app/view/main/highlights/TopMatchesView'),
        FootballScoreboard = require('app/view/inplay/FootballScoreboard'),
        BasketballScoreboard = require('app/view/inplay/BasketballScoreboard'),
        BaseballScoreboard = require('app/view/inplay/BaseballScoreboard'),

        MarketsView = require('app/view/main/markets/MarketsView'),
        MarketsViewPM = require('app/view/main/markets/MarketsViewPM'),
        MarketGroupsView = require('app/view/main/markets/MarketGroupsView'),
        MarketGroupsViewPM = require('app/view/main/markets/MarketGroupsViewPM'),
        CouponsEventViewPM = require('app/view/main/coupons/CouponsEventViewPM'),
        CompetitionEventViewPM = require('app/view/main/competitions/CompetitionEventViewPM'),

        LoginPopup = require('app/view/popups/login/LoginPopup'),
        MessagePopup = require('app/view/popups/message/MessagePopup'),

        // Left Panel
        NavSport = require('app/view/side/NavSport'),
        CurrentSport = require('app/view/side/CurrentSport'),
        InPlay = require('app/view/side/InPlay'),
        Competitions = require('app/view/side/Competitions'),
        // Right Panel
        IPVpanelFootball = require('app/view/sidebarIPV/IPVpanelFootball'),
        IPVpanelBaseball = require('app/view/sidebarIPV/IPVpanelBaseball'),
        IPVpanelBasketball = require('app/view/sidebarIPV/IPVpanelBasketball'),

        OddsFactory = require('common/factory/OddsFactory'),

        SideBarRegion = require('app/view/regions/SideBarRegion'),
        RightRegion = require('app/view/regions/RightRegion'),
        MainRegion = require('app/view/regions/MainRegion'),
        AllSport = require('app/view/side/AllSport'),
        RegisterPopup = require('app/view/popups/register/RegisterPopup');

        Clock = require('app/model/Clock');

    return DeferredBase.extend({
        name: 'AppConfig',

        /**
         * Set up the IoC context
         */
        init: function() {
            this.app = this.options.app;
            this.manage();
        },

        /**
         * Then add our dependencies to be managed
         */
        manage: function(){

            /**
             * Arbitrary params
             */

            this.add('appname', 'Sportsbook');
            this.add('appid', 'web-sportsbook');
            this.add('cookieName', 'ATS_SB');
            this.add('endpoint', 'http://sportsbook-dev.amelco.co.uk/sportsbook/v1/api/');
            this.add('wsendpoint', 'ws://sportsbook-dev.amelco.co.uk:9998/websocket');

            /**
             * Application
             */

            this.add("vent", this.app.vent);
            this.add("reqres", this.app.reqres);
            this.add("commands", this.app.commands);

            /**
             * Services
             */

            this.singleton('apiService', ApiService, {url:this.app.endpoint});
            this.singleton('socketService', SocketService);

            /**
             * Presentation Models
             */


            this.singleton('betSlipPM', BetSlipPM);
            this.singleton('sportsScheduleViewPM', SportsScheduleViewPM);
            this.singleton('eventSchedulePM', EventSchedulePM);
            this.singleton('marketsViewPM', MarketsViewPM);
            this.singleton('marketGroupsViewPM', MarketGroupsViewPM);
            this.singleton('couponsEventViewPM', CouponsEventViewPM);
            this.singleton('competitionEventViewPM', CompetitionEventViewPM);

            /**
             * Models
             */

            this.singleton('eventCache', EventCache);
            this.singleton('sessionModel', SessionModel, {vent: this.app.vent});
            this.proto('eventScheduleModel', EventScheduleModel); // needs to be proto as multiple instances required - one for each sport
            this.singleton('frontPageModel', FrontPageModel);
            this.singleton('eventDetailsModel', EventDetailsModel);
            this.singleton('marketGroupsModel', MarketGroupsModel);
            this.singleton('keyMarketsModel', KeyMarketsModel);
            this.singleton('eventModel', EventModel);
            this.singleton('betsModel', BetsModel);

            /**
             * Controllers
             */

            this.singleton('appController', AppController);
            this.singleton('subsController', SubscriptionController);

            /**
             * Factories
             */

            this.singleton('oddsFactory', OddsFactory,[[],0]);

            /**
             * ----------------------------------------------
             * Views
             * ----------------------------------------------
             */

            /**
             * Centralised view presenter
             */
            this.proto('appViewPM', AppViewPM);

            /**
             * Main Regions
             */

            this.singleton('headerView', HeaderView);
            this.singleton('footerView', FooterView);
            this.singleton('leftPanelView', SideBarRegion);
            this.singleton('mainView', MainRegion);
            this.singleton('rightPanelView', RightRegion);


            /**
             * SideBarRegion
             */

            var method = (App.globals.singleViews) ? 'singleton' : 'proto';

            this[method]('navSport', NavSport);
            this[method]('currentSport', CurrentSport);
            this[method]('inPlay', InPlay);
            this[method]('competitions', Competitions);
            this[method]('allSport', AllSport);

            /**
             * MainRegion
             */

            this[method]('sportsScheduleView', SportsScheduleView);
            this[method]('eventScheduleView', EventScheduleView);
            this[method]('matchHighlightsView', MatchHighlightsView);
            this[method]('topMatchesView', TopMatchesView);
            this[method]('competitionsView', CompetitionsView);
            this[method]('countriesView', CountriesView);

            this[method]('competitionEventView', CompetitionEventView);
            this[method]('couponsView', CouponsView);
            this[method]('couponsEventView', CouponsEventView);
            this[method]('countriesEventView', CountriesEventView);

            this[method]('marketsView', MarketsView);
            this[method]('marketGroupsView', MarketGroupsView);
            this[method]('betSlipView', BetSlipView);
            this[method]('singleBetView', SingleBetView);
            this[method]('multipleBetView', MultipleBetView);
            this[method]('confirmationBetView', ConfirmationBetView);
            this[method]('rejectedBetView', RejectedBetView);
            this[method]('openBetsView', OpenBetsView);
            this[method]('closedBetsView', ClosedBetsView);

            /**
             * RightRegion
             */

            this[method]('IPVpanelFootball', IPVpanelFootball);
            this[method]('IPVpanelBaseball', IPVpanelBaseball);
            this[method]('IPVpanelBasketball', IPVpanelBasketball);

            /**
             * Scoreboards
             */

            this[method]('inplayViewFootball', FootballScoreboard);
            this[method]('inplayViewBaseball', BaseballScoreboard);
            this[method]('inplayViewBasketball', BasketballScoreboard);


            /**
             * Popups
             */

			this.proto("messagePopup", MessagePopup);
            this.proto("loginPopup", LoginPopup);
            this.proto("registerPopup", RegisterPopup);

            /**
             * Utils
             */
            this.proto('clock', Clock);


            // finish
            this.construct();
        },


        /**
         * Shortcut method to register a object with the context to be created as a singleton
         * @param id
         * @param clazz
         * @param options
         * @returns {*}
         */
        singleton: function(id, clazz, options) {
            options = options || {};
            return ctx.register(id, clazz, options);
        },


        /**
         * Shortcut method to register a object with the context to be created with
         * strategy set as proto, ie. a new instance is created for every 'get' or 'create'
         * @param id
         * @param clazz
         * @param options
         */
        proto: function(id, clazz, options) {
            this.singleton(id, clazz, options).strategy(di.strategy.proto);
        },


        /**
         * Shortcut method to register an existing object with the context
         * @param id
         * @param object
         */
        add: function(id, object) {
            ctx.register(id).object(object);
        },


        /**
         * Finally constructs the container
         */
        construct: function(){
            var that = this;
            _.each(_.keys(ctx.map), function(key){
                console.log('Bootstrap: '+that.name+' - managed: '+key);
            });
            this.success(ctx);
        }
    });
});