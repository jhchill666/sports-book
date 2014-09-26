define([
    'marionette',
    'text!app/view/main/schedule/EventScheduleView.tpl.html'
],
    function(Marionette, tpl) {
        return Marionette.View.extend({


            dependencies: 'pm=eventSchedulePM, model=eventDetailsModel, vent, commands',
            template: _.template(tpl),


            /**
             *
             */
            initialize: function() {
                _.bindAll(this, 'onPriceFormatChange');
            },


            /**
             *
             */
            ready: function() {
                this.pm.on("onDataComplete",this.onDataComplete, this);
                this.pm.on("onInplayIncidentChange",this.onInplayIncidentChange, this);
                this.pm.on("onParticipantChange",this.onParticipantChange, this);
                this.vent.bind('globals:priceFormatChange', this.onPriceFormatChange);
            },


            /**
             *
             */
            onShow: function() {
                this.pm.getData(this.options);
            },


            /**
             *
             * @param schedule
             */
            onDataComplete: function(schedule) {
                var args   = {schedule: schedule, locale: this.options.locale, sport: this.options.sport, format: App.globals.priceFormat};
                this.$el.html(this.template(args));

                this.subscribe(schedule, this.options.sport);
            },


            /**
             * Handle price format changes - simply re-render the view
             */
            onPriceFormatChange: function() {
//                rerender template
//                this.template = _.template(tpl);
                this.onDataComplete(this.pm.schedule);
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
            subscribe: function(schedule, sport) {
                var events = [], group = schedule.getGroupedEvents();
                _.each(group.events, function(event) {
                    events.push(event.get('id'));
                });
                this.commands.execute('command:subscribe:events', sport, events.join(','));
            }
        });
    });

