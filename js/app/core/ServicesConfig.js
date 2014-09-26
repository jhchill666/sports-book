define([
    'common/bootstrap/core/DeferredBase','ctx',
    'common/command/api/LoginCommand',
    'common/command/api/LogoutCommand',
    'common/command/api/GetBalanceCommand',
    'common/command/api/GetPriceAdjustmentCommand',
    'common/command/api/GetSportScheduleCommand',
    'common/command/api/GetKeyMarketsForSportCommand',
    'common/command/api/GetEventCommand',
    'common/command/api/GetCompetitionEventsCommand',
    'common/command/api/GetCouponEventsCommand',
    'common/command/api/GetSportDisplayTemplateCommand',
    'common/command/api/PlaceBetsCommand',
    'common/command/api/GetOpenBetsCommand',
    'common/command/api/GetClosedBetsCommand',    
    'common/command/api/GetFrontPageScheduleCommand',
    'common/command/api/GetRootLadderCommand',
    'common/command/subscriptions/SubscriptionCommand'
],
function (DeferredBase, ctx, Login, Logout, GetBalance, GetPriceAdjustment, 
            GetSportSchedule, GetKeyMarkets, GetEvent, GetCompetitionEvents,GetCouponEvents,
            GetSportDisplayTemplate,PlaceBets,GetOpenBets,GetClosedBets,GetFrontPageSchedule, GetRootLadder, SubscriptionCommand) {
    return DeferredBase.extend({
        name: 'ServicesConfig',


        /**
         * Set up the IoC context
         */
        init: function() {
            this.app = this.options.app;
            
            this.app.commands.setHandler("command:login", Login);
            this.app.commands.setHandler("command:logout", Logout);
            this.app.commands.setHandler("command:recoverlogin", Logout);
            this.app.commands.setHandler("command:getbalance", GetBalance);
            this.app.commands.setHandler("command:getPriceAdjustment", GetPriceAdjustment);
            this.app.commands.setHandler("command:getRootLadder", GetRootLadder);
            
            this.app.commands.setHandler("command:getFrontPageSchedule", GetFrontPageSchedule);
            this.app.commands.setHandler("command:getSportSchedule", GetSportSchedule);
            this.app.commands.setHandler("command:getKeyMarketsForSport", GetKeyMarkets);
            this.app.commands.setHandler("command:getEvent", GetEvent);
            this.app.commands.setHandler("command:getCompetitionEvents", GetCompetitionEvents);
            this.app.commands.setHandler("command:getCouponEvents", GetCouponEvents);
            this.app.commands.setHandler("command:getSportDisplayTemplate", GetSportDisplayTemplate);

            this.app.commands.setHandler("command:placeBets", PlaceBets);
            this.app.commands.setHandler("command:getOpenBets", GetOpenBets);
            this.app.commands.setHandler("command:getClosedBets", GetClosedBets);

            this.app.commands.setHandler("command:subscribe:events", SubscriptionCommand);
            this.app.commands.setHandler("command:subscribe:eventDetails", SubscriptionCommand);
            this.app.commands.setHandler("command:subscribe:markets", SubscriptionCommand);
            this.app.commands.setHandler("command:subscribe:schedule", SubscriptionCommand);

            this.success();
        }
    })
});
