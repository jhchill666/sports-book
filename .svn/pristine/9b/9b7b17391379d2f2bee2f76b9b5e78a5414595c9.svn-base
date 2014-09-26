define(['marionette',
    'app/model/Event',
    'app/model/Market'
],
        function(Marionette, Event, Market) {

            return Marionette.Controller.extend({


                dependencies: 'schedule=eventScheduleModel, details=eventDetailsModel, commands, vent',


                /**
                 * @param options
                 */
                ready: function(options) {
                    this.schedule.on("change:competitionEvents", this.onCompetitionEventsChange, this);
                },


                /**
                 * @param options
                 */
                getData: function(options) {
                    var competitionId = options.competitionId;
                    var locale = App.globals.locale;
                    this.commands.execute('command:getCompetitionEvents', competitionId, 6, locale )
                        .done(this.onCompetitionsEventSuccess)
                        .fail(this.onCompetitionsEventFailure);
                },


                /**
                 * @param data
                 * @param textStatus
                 * @param jqXHR
                 */
                onCompetitionsEventSuccess: function(data, textStatus, jqXHR) {

                },


                /**
                 * @param data
                 * @param textStatus
                 * @param jqXHR
                 */
                onCompetitionsEventFailure: function(data, textStatus, jqXHR) {
                    //Add logic for no data returned.
                },


                /**
                 * @param model
                 */
                onCompetitionEventsChange: function(model) {
                    this.trigger("onDataComplete", this.getCompetitions());
                },


                /**
                 * Returns current events and competitions
                 * @returns {{competitionEvents: *, competitions: *}}
                 */
                getCompetitions: function() {
                    var events = this.schedule.get('competitionEvents'),
                        comps  = this.schedule.get('competitions');
                    return {competitionEvents: events, competitions: comps};
                }
            });
        });