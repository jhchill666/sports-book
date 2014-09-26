define(function (require) {
    var Marionette = require('marionette');

    return Marionette.AppRouter.extend({
        
        appRoutes: {
        	/*":locale/:sport/competitions/:competitionId" : "competitions", // #competitions/167010
            ":locale/:sport/coupondetails/:eventId" : "coupondetails",
            ":locale/:sport/coupons/:couponId" : "coupons",
            
            ":sport/competitions/:competitionId" : "competitionsWithDefaultLocale", // #competitions/167010
            ":sport/eventdetails/:eventId" : "eventdetailsWithDefaultLocale",
            ":sport/coupondetails/:eventId" : "coupondetailsWithDefaultLocale",
            ":sport/coupons/:couponId" : "couponsWithDefaultLocale",*/

            ":locale/:sport/eventdetails/:eventId" : "onEventdetails",
            
            ":locale/:sport/competition/:competitionsId" : "onCompetitionRoute",
            ":locale/:sport/coupons/:couponId" : "onCouponRoute",
            ":locale/:sport/country/:countryId" : "onCountryRoute",
            
            ":locale/:sport/today" : "onHomeSportRouteToday",
            ":locale/:sport/tomorrow" : "onHomeSportRouteTomorrow",
            ":locale/:sport" : "onHomeSportRoute",
            ":sport" : "onHomeSportRouteWithDefaultLocale",
            "" : "onHomeRoute",
            "*noRoute" : "onNotFound"
        }
    });
});


