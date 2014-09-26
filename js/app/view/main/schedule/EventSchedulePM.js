define(['marionette',
    'app/model/Event',
    'app/model/Market',
    'common/util/DateTimeUtil'
],
        function(Marionette, Event, Market, date) {

            return Marionette.Controller.extend({

                dependencies: 'schedule=eventScheduleModel, oddsFactory, commands, vent',


                /**
                 * @param options
                 */
                ready: function(options) {
                    _.bindAll(this,'onIncidentChange',
                        'onEventPropertyChange','onMarketPropertyChange');

                    this.vent.bind('event:propertyChange', this.onEventPropertyChange);
                    this.vent.bind('market:propertyChange', this.onMarketPropertyChange);
                    this.vent.bind('incidents:change', this.onIncidentChange);
                                        
                    this.schedule.on("change:inplay", this.onModelInplayChange, this);
                    this.schedule.on("change:prematch", this.onModelPrematchChange, this);
                    this.schedule.on("change:participants", this.onModelParticipantsChange, this);
                    this.schedule.on("change:competitions", this.onModelCompetitionsChange, this);
                    this.schedule.on("change:coupons", this.onModelCouponsChange, this);
                },


                /**
                 * @param changedObj
                 */
                onEventPropertyChange: function(changedObj) {
                    var changed = changedObj.changed;
                    var eventId = changedObj.id;

                    var eventEl = 'event-schedule-market-' + eventId;
                    var elementToBeUpdated = $('#'+eventEl);
                    if(changed.state == "SUSPENDED")
                        elementToBeUpdated.removeClass("disabled").addClass("disabled");
                    else if(!_.has(changed, "displayed"))
                        elementToBeUpdated.removeClass("disabled");

                    if(_.has(changed, "displayed")) {
                        this.rebuildTemplate();
                        this.trigger("onEventPropertyChange", changedObj);
                    }
                    else {
                        this.trigger("onEventPropertyChange", changedObj);
                    }
                },

                onMarketPropertyChange: function(changedObj) {
                    var changed = changedObj.changed;
                    var eventId = changedObj.eventId;
                    var marketId = changedObj.id;

                    var marketEl = 'event-schedule-market-'+marketId;
                    var elementToBeUpdated = $('#'+marketEl);

                    if(changed.state == "SUSPENDED")
                        elementToBeUpdated.removeClass("disabled").addClass("disabled");
                    else if(!_.has(changed, "displayed"))
                        elementToBeUpdated.removeClass("disabled");

                    if(_.has(changed, "displayed")) {
                        this.rebuildTemplate();
                        this.trigger("onEventPropertyChange", changedObj);
                    }
                    else {
                        this.trigger("onEventPropertyChange", changedObj);
                    }
                },
                
                onModelCouponsChange: function(event) {
                    var coupons = event.attributes.coupons;
                    this.trigger("onCouponsDataComplate", coupons);
                },
                
                onModelCompetitionsChange: function(event) {
                    var comps = event.attributes.competitions;
                    this.trigger("onCompetitionsDataComplate", comps);
                },
                
                onModelInplayChange: function(event) {
                    var inplayEvents = event.attributes.inplay;
                    this.trigger("onInplayDataComplate", inplayEvents);
                },
                
                onModelPrematchChange: function(event) {
                    console.log('onPrematch change');
                },
                
                onIncidentChange: function(incident) {
                    //Added here in the PM for validation and local dispatch to view. See _changed attribute.)
                    if (incident.attributes.type != 'PeriodStart') {
                        this.trigger("onInplayIncidentChange", incident);   
                    }
                },
                
                onModelParticipantsChange: function(event) {
                    //Add validation to check id the event is in the schedule perhaps?
                    //FIXME: Inefficient, this should be available in the template.
                    //if ( event.attributes.inplay === true ) {
                        this.trigger("onParticipantChange", event);   
                    //}
                },
                

                getData: function(options) {
                    this.options = _.extend(this.options, options);

                    this.buildEventScheduleForView(this.schedule.getPrematchAndInplay());
                    this.updateView();
                },
                

                updateView: function() {
                    this.trigger("onDataComplete", this.schedule);
                    this.trigger("onInplayDataComplate", this.schedule.getInplay());
                },
                
                buildEventScheduleForView: function(events) {
                    var sports = [], eventIds = [];
                    var days = {};

                    _.each(events.models, function(event) {
                        sports.push(event.get('sport'));

                        // get event time (moment) and natural language day
                        var eventTime = moment(event.get('eventTime'));
                        var day = date.groupingDayName(eventTime.toDate());

                        // add a formatted the display time
                        event.set('displayTime', eventTime.format("h:mm a"));

                        // the the event time is before or after the
                        // start/end time, or the event is non-displayed,
                        // don't add it to the event schedule
                        if (_.has(this.options, 'eventStart') && eventTime.isBefore(this.options.eventStart) ||
                            _.has(this.options, 'eventEnd') && eventTime.isAfter(this.options.eventEnd)) {
                            return;
                        }

                        if (!_.has(days, day))
                            days[day] = {marketsCount: 0, events: []};

                        days[day].date = eventTime.startOf('day').toDate();
                        days[day].marketsCount += event.attributes.numMarkets;
                        days[day].events.push(event);

                        eventIds.push(event.id);
                    }, this);

                    this.schedule.setGroupedEvents(days);
                    this.commands.execute('command:subscribe:events', sports.join(','), eventIds.join(','))
                },

                rebuildTemplate: function() {
                    this.buildEventScheduleForView(this.schedule.getPrematchAndInplay());
                    this.updateView();
                }

            });
        });


