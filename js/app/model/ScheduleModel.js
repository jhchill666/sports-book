/**
 * Created by Jamie on 10/09/2014.
 *
 * The ScheduleModels sole responsibility, should be to load/parse and store SportSchedules
 */
define(['backbone', 'ctx', 'app/model/SportSchedule', 'app/collection/ScheduleCollection', 'app/model/Event'],
    function(Backbone, ctx, SportSchedule, ScheduleCollection) {
        return Backbone.Model.extend({


            dependencies: 'vent, commands',
            schedules: new ScheduleCollection(),


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
                this.vent.on('globals:sportChange', this.onSportChange);
                this.vent.on('globals:localeChange', this.onLocaleChange);
                this.onLocaleChange(App.globals.locale);
                this.onSportChange(App.globals.sport);
            },


            /**
             * When the locale changes, we need to re-load the front page
             * schedule in order to update with the required localizations
             * @param locale
             */
            onLocaleChange: function(locale) {
                this.commands.execute('command:getFrontPageSchedule', 6, locale);
            },


            /**
             * When the sport changes, just ensure we're got the key market types loaded
             * @param locale
             */
            onSportChange: function(sport) {
                var schedule = this.getSchedule();
                if (_.isUndefined(schedule) || !schedule.has('keyMarketTypes'))
                    this.commands.execute('command:getKeyMarketsForSport', sport);
            },


            /**
             * @param data
             */
            parseSchedules: function(sports) {
                _.each(sports, this.parseSchedule, this);
            },


            /**
             * @param data
             */
            parseSchedule: function(sport) {
                var model = this._getSchedule(sport);
                model.setInplay(sport.inplay, true);
                model.setPrematch(sport.prematch, true);
                model.setCompetitions(sport.competitions.category);
                model.setCoupons(sport.coupons.coupon);
            },


            /**
             * Returns a Schedule from the model
             * @param sport
             */
            getSchedule: function(sport) {
                sport = sport || App.globals.sport;
                this.schedules.findWhere({sport: sport});
            },


            /**
             *
             */
            updateComplete: function() {
                this.trigger("updateComplete", {});
            },


            /**
             * -------------------------------------------------------------
             * Internal
             * -------------------------------------------------------------
             */


            /**
             * Retrieves a previous/new ScheduleModel
             * @param sport
             * @returns {*}
             * @private
             */
            _getSchedule: function(sport) {
                // if a schedule exists for this sport, return it
                var schedule = this.schedules.findWhere({sport: sport});
                if (schedule) return schedule;

                // create a new instance from the context
                var schedule = ctx.create('sportSchedule', {sport: sport});

                // add the new schedule to the collection and return
                return this.schedules.add(schedule);
            }
        });
    });