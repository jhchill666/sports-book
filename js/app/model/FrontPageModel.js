/**
 * Created by Jamie on 10/09/2014.
 */
define(['backbone', 'app/model/EventScheduleModel', 'ctx'],
function(Backbone, EventScheduleModel, ctx) {
    return Backbone.Model.extend({


        dependencies: 'vent, commands, model=marketGroupsModel',
        defaults: {
            frontSchedules: {},
            schedules: {}
        },


        /**
         *
         */
        initialize: function() {
            _.bindAll(this, 'onLocaleChange', 'onSportChange');
        },


        /**
         *
         */
        ready: function() {
            this.vent.on('globals:localeChange', this.onLocaleChange);
            this.vent.on('globals:sportChange', this.onSportChange);
            this.onLocaleChange(App.globals.locale);
            this.onSportChange(App.globals.sport);
        },


        /**
         * When the locale changes, we need to re-load the front page
         * schedule in order to update with the required localizations
         * @param locale
         */
        onLocaleChange: function(locale) {
            this.commands.execute('command:getFrontPageSchedule',
                6, App.globals.locale);
        },


        /**
         * When the sport changes, we need to re-load the sport schedule
         * @param sport
         */
        onSportChange: function(sport) {
            var locale = App.globals.locale;
            this.commands.execute('command:getSportSchedule',
                sport, 6, App.globals.locale);
        },


        /**
         * @param data
         */
        parseSchedules: function(sports, frontPage) {
            var model, silent = true;
            var schedules = {};

            // build a schedule for each sport
            _.each(sports, function(sport) {
                model = ctx.create('eventScheduleModel', {sport: sport.code.toLowerCase()});
                model.setInplay(sport.inplay,silent);
                model.setPrematch(sport.prematch,silent);
                model.setCompetitions(sport.competitions.category);
                model.setCoupons(sport.coupons.coupon);
                schedules[sport.code] = model;
            });

            this.set('frontSchedules', schedules);
        },


        /**
         * @param data
         */
        parseSchedule: function(sport) {
            var model, silent = true;
            var schedules = _.clone(this.get('schedules'));

            model = ctx.create('eventScheduleModel', {sport: sport.code.toLowerCase()});
            model.setInplay(sport.inplay,silent);
            model.setPrematch(sport.prematch,silent);
            model.setCompetitions(sport.competitions.category);
            model.setCoupons(sport.coupons.coupon);
            schedules[sport.code] = model;

            this.set('schedules', schedules);
        },


        /**
         *
         */
        updateComplete: function() {
            this.trigger("updateComplete", {});
        }
    });
});