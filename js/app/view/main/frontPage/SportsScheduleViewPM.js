define([
        'marionette',
        'app/model/Event',
        'app/model/Market',
        'common/util/DateTimeUtil',
        'common/util/CollectionUtil'
    ],
    function(Marionette, Event, Market, date, collectionUtil) {

        return Marionette.Controller.extend({

            dependencies: 'model=frontPageModel, commands, vent, oddsFactory',
            priceChangedMap:[],


            /**
             * @param options
             */
            ready: function(options) {
                _.bindAll.apply(_, [this].concat(_.functions(this)));

                this.model.on("change:frontSchedules", this.getData, this);

                this.vent.bind('event:propertyChange', this.onEventPropertyChange);
                this.vent.bind('market:propertyChange', this.onMarketPropertyChange);
            },

            /**
             * @param options
             */
            getData: function(options) {
                if (_.size(this.model.get('frontSchedules')) == 0) return;

//                this.commands.execute('command:getKeyMarketsForSport', options.sport);

                this.buildEventScheduleForView(options);
                this.updateView();

            },
            /**
             *
             */
            updateView: function() {
                this.trigger("onDataComplete", this.schedule);
            },


            /**
             * @param options
             */
            buildEventScheduleForView: function(options) {
                var sports    = [], eventIds = [],
                    schedules = this.model.get('frontSchedules'),
                    that      = this;

                _.each(schedules, function(schedule) {
                    sports.push(schedule.get('sport'));

                    var days = {};
                    var collection = schedule.getPrematchAndInplay();

                    _.each(collection.models, function(event) {

                        // get event time (moment) and natural language day
                        var eventTime = moment(event.get('eventTime'));
                        var day = date.groupingDayName(eventTime.toDate());

                        // add a formatted the display time
                        event.set('displayTime', eventTime.format("h:mm a"));

                        // the the event time is before or after the
                        // start/end time, or the event is non-displayed,
                        // don't add it to the event schedule
//                        if (eventTime.isBefore(options.eventStart) ||
//                            eventTime.isAfter(options.eventEnd) ||
//                            !event.attributes.displayed) {
//                            return;
//                        }

                        if (!_.has(days, day))
                            days[day] = {marketsCount: 0, events: []};

                        days[day].date = eventTime.startOf('day').toDate();
                        days[day].marketsCount += event.attributes.numMarkets;
                        days[day].events.push(event);

                        eventIds.push(event.id);
                    });

                    schedule.setGroupedEvents(days);
                });

                this.commands.execute('command:subscribe:events', sports.join(','), eventIds.join(','))
            },


            /**
             * @param changedObj
             */
            onEventPropertyChange: function(changedObj) {
                var changed = changedObj.changed;
                var eventId = changedObj.id;

                var eventEl = 'event-schedule-market-' + eventId;
                var elementToBeUpdated = $('#' + eventEl);
                if (changed.state == "SUSPENDED")
                    elementToBeUpdated.removeClass("disabled").addClass("disabled");
                else if (!_.has(changed, "displayed"))
                    elementToBeUpdated.removeClass("disabled");

                if (_.has(changed, "displayed")) {
                    if (changed.displayed == false || changed.displayed == true) {
                        this.rebuildTemplate();
                    }
                    else {
                        this.trigger("onEventPropertyChange", changedObj);
                    }
                }
                else {
                    this.trigger("onEventPropertyChange", changedObj);
                }


            },


            /**
             * @param changedObj
             */
            onMarketPropertyChange: function(changedObj) {
                var changed = changedObj.changed;
                var eventId = changedObj.eventId;
                var marketId = changedObj.id;

                var marketEl = 'event-schedule-market-' + marketId;
                var elementToBeUpdated = $('#' + marketEl);

                if (changed.state == "SUSPENDED")
                    elementToBeUpdated.removeClass("disabled").addClass("disabled");
                else if (!_.has(changed, "displayed"))
                    elementToBeUpdated.removeClass("disabled");

                if (_.has(changed, "displayed")) {
                    this.rebuildTemplate();
                    this.trigger("onEventPropertyChange", changedObj);
                }
                else {
                    this.trigger("onEventPropertyChange", changedObj);
                }
            },


            /**
             *
             */
            rebuildTemplate: function() {
                this.buildEventScheduleForView(this.options);
                this.updateView();
            }
        });
    });