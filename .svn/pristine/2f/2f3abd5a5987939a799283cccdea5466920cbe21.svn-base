define(function (require) {
    var Service = require('common/framework/service/Backbone.Service');
    return Service.extend({
        dependencies: 'url=endpoint, session=sessionModel, appid',
        defaults: {
            sessionToken: function(){
                return this.session.getSessionToken();
            },
            application: function(){
                return this.appid;
            }
        },


        ready: function(){
            var blah = "blah";
        },

        targets: {
            login: {
                method: 'post',
                args: [
                    'username',
                    'password',
                    { application: { attr: 'application' }}
                ]
            },

            logout: {
                method: 'post',
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            keepAlive: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },

            getBalance: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },
            
            getPriceAdjustmentDetails: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },
            
            getRootLadder: {
               args: [] 
            },
                    
            
            getFrontPageSchedule: {
                args: [
                    'channelId',
                    'locale'
                ]
            },
            
            getSportSchedule: {
                args: [
                    'sport',
                    'channelId',
                    'locale'
                ]
            },
            
            getCompetitionEvents: {
                args: [
                    'competitionId',
                    'channelId',
                    'locale'
                ]
            },
            
            getCouponEvents: {
                args: [
                    'couponId',
                    'channelId',
                    'locale'
                ]
            },
            
            getKeyMarketsForSports: {
                args: [
                    'sports'
                ]
            },

            getSportDisplayTemplate: {
                args: [
                    'sport',
                    'channelId',
                    'locale'
                ]
            },
            
            getEvent: {
                args: [
                    'eventId',
                    'channelId',
                    'locale'
                ]
            },

            getPageLayout: {
                method: 'getjson',
                args: [
                    { channelId: '6' },
                    { locale: 'en-us' }
                ]
            },
            savePageLayout: {
                method: 'post',
                args: [
                    'pageLayout',
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },
            
            placeBets: {
                method: 'post',
                args: [
                    { sessionToken: { attr: 'sessionToken' }},
                    'bets'
                ]
            },
            
            getOpenBets: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }}
                ]
            },
            
            getClosedBets: {
                args: [
                    { sessionToken: { attr: 'sessionToken' }},
                    'from',
                    'to'
                ]
            },

        }
    });
});


