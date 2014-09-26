define([
    'marionette',
    'ctx',
    'text!app/view/main/frontPage/SportsScheduleView.tpl.html',
    'common/util/StringUtil'
],
function(Marionette, ctx, tpl, StringUtil) {
    return Marionette.View.extend({


        dependencies: 'pm=sportsScheduleViewPM, frontPageModel, vent, commands',
        template: _.template(tpl),


        /**
         *
         */
        initialize: function() {
            _.bindAll.apply(_, [this].concat(_.functions(this)));
        },


        /**
         *
         */
        ready: function() {
            _.bindAll(this, 'onDataComplete', 'onPriceFormatChange');

            this.pm.on("onDataComplete", this.onDataComplete, this);
            this.pm.on("onParticipantChange",this.onParticipantChange, this);

            this.vent.bind('globals:priceFormatChange', this.onPriceFormatChange);
        },


        /**
         * @param event
         */
        onShow: function() {
            _.extend(this.pm.options, this.options);
            this.pm.getData(this.options);
        },


        /**
         * @param event
         */
        onDataComplete: function(event) {
            var sport       = this.options.sport,
                locale      = this.options.locale,
                schedules   = this.frontPageModel.get('frontSchedules');

            var args = {schedules: schedules, locale: locale, sport: sport, StringUtil: StringUtil, format: App.globals.priceFormat};
            this.$el.html(this.template(args));

            // subscribe to these events
            this.subscribe(schedules, sport);
        },


        /**
         * Handle price format changes - simply re-render the view
         */
        onPriceFormatChange: function() {
            this.onDataComplete();
        },


        /**
         * @param event
         */
        onParticipantChange: function(event) {
            var eventId = event.id;
            var participantAel = 'event-schedule-participant-a-'+eventId;
            $('#'+participantAel).html(event.getParticipantA());

            var participantBel = 'event-schedule-participant-b-'+eventId;
            $('#'+participantBel).html(event.getParticipantB());
        },


        /**
         * @param incident
         */
        onInplayIncidentChange: function(incident) {
            var score = incident.getGoalScore();
            var eventId = incident.attributes.eventId;
            var inplayEl = 'event-schedule-inplay-score-'+eventId;
            $('#'+inplayEl).html(score);
        },


        /**
         * @param schedules
         */
        subscribe: function(schedules, sport) {
            var events = [], sports = [];
            _.each(schedules, function(schedule){
                var group = schedule.getGroupedEvents();
                _.each(group.events, function(event) {
                    events.push(event.get('id'));
                    sports.push(event.get('code'));
                });
            })
            this.commands.execute('command:subscribe:events', sports.join(','), events.join(','));
        }
    });
});