/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    'marionette',
    'text!app/view/main/highlights/MatchHighlightsView.tpl.html'
],
        function (Marionette, tpl) {
            return Marionette.View.extend({


                dependencies: 'pm=eventSchedulePM, vent',
                template: _.template(tpl),


                /**
                 *
                 */
                ready: function () {
                    _.bindAll(this, 'onDataComplete', 'onPriceFormatChange');

                    this.pm.on("onDataComplete", this.onDataComplete, this);
                    this.pm.on("onInplayIncidentChange", this.onInplayIncidentChange, this);
                    this.pm.on("onParticipantChange", this.onParticipantChange, this);

                    this.vent.bind('globals:priceFormatChange', this.onPriceFormatChange);
                },


                /**
                 *
                 */
                onShow: function () {
                    this.onDataComplete(this.pm.schedule);
                },


                /**
                 * @param schedule
                 */
                onDataComplete: function (schedule) {
                    if (_.isUndefined(schedule)) return;
                    var sport  = App.globals.sport,
                        locale = App.globals.locale,
                        events = _.first(schedule.getPrematch(), 3);


                    var args = {schedule: schedule, locale: locale, sport: sport, format: App.globals.priceFormat, events: events};
                    this.$el.html(this.template(args));


                    $('.hl-list-item').hover(function () {

                        var panelNum = $(this).attr('panel');
                        var backgroundImg = $(this).attr('backgroundImage');

                        $('#market-highlights .show').removeClass('show');

                        $('#panel-' + panelNum).parent().attr('style', 'background-image:url("images/' + backgroundImg + '");');

                        $('#panel-' + panelNum + ' > div').addClass('show');
                        $(this).addClass('active');

                    }, function () {
                        $(this).removeClass('active');
                    });
                },


                /**
                 * Handle price format changes - simply re-render the view
                 */
                onPriceFormatChange: function() {
                    this.onDataComplete(this.pm.schedule);
                },
                

                /**
                 * @param event
                 */
                onParticipantChange: function (event) {
                    var eventId = event.id;
                    var participantAel = 'event-schedule-participant-a-' + eventId;
                    $('#' + participantAel).html(event.getParticipantA());

                    var participantBel = 'event-schedule-participant-b-' + eventId;
                    $('#' + participantBel).html(event.getParticipantB());
                },


                /**
                 * @param incident
                 */
                onInplayIncidentChange: function (incident) {
                    var score = incident.getGoalScore();
                    var eventId = incident.attributes.eventId;
                    var inplayEl = 'event-schedule-inplay-score-' + eventId;
                    $('#' + inplayEl).html(score);
                }
            });
        });


