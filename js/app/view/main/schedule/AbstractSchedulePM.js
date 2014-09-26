/**
 * Created by Jamie on 17/09/2014.
 */
define(['marionette',
        'app/model/Event',
        'app/model/Market',
        'common/util/DateTimeUtil',
        'common/util/CollectionUtil'
    ],
    function(Marionette, Event, Market, date) {

        return Marionette.Controller.extend({
            dependencies: 'model=frontPageModel, schedule=eventScheduleModel, oddsFactory, commands, vent',


            priceChangedMap:[],
            priceChangeDurationInSecs:10,
            timerCount:0,


            /**
             * @param options
             */
            ready: function() {
//                _.bindAll.apply(_, [this].concat(_.functions(this)));

                _.bindAll(this,'onSportScheduleSuccess', 'onIncidentChange', 'onSelectionPriceChange',
                    'onGlobalTimerEvent','onEventPropertyChange','onMarketPropertyChange','onPriceFormatChange');

                this.vent.bind('globals:priceFormatChange', this.onPriceFormatChange);
                this.vent.bind('event:propertyChange', this.onEventPropertyChange);
                this.vent.bind('market:propertyChange', this.onMarketPropertyChange);
                this.vent.bind('selection:priceChange', this.onSelectionPriceChange);
                this.vent.bind('incidents:change', this.onIncidentChange);
                this.vent.bind('app:timer', this.onGlobalTimerEvent);

                this.schedule.on("change:inplay", this.onModelInplayChange, this);
                this.schedule.on("change:prematch", this.onModelPrematchChange, this);
                this.schedule.on("change:participants", this.onModelParticipantsChange, this);
                this.schedule.on("change:competitions", this.onModelCompetitionsChange, this);
                this.schedule.on("change:coupons", this.onModelCouponsChange, this);
            },


            /**
             * @param options
             */
            getData: function(options) {
                this.options = _.extend(options, this.options);

                var sport = this.options.sport;
                var locale = this.options.locale;
                this.commands.execute('command:getKeyMarketsForSport', sport);

                this.commands.execute('command:getSportSchedule', sport, 6, locale)
                    .done(this.onSportScheduleSuccess)
                    .fail(this.onSportScheduleFailure);
            },


            /**
             *
             */
            updateView: function() {
                this.trigger("onDataComplete", this.schedule);
                this.trigger("onInplayDataComplate", this.schedule.getInplay());
            },


            /**
             * @param schedule
             */
            buildEventScheduleForView: function(schedule) {
                this.options = this.options || {};
                this.buildEventSchedule(schedule);
            },


            /**
             * @param schedule
             */
            buildEventSchedule: function(schedule) {
                var days = {}, that = this,
                    events = schedule.getPrematchAndInplay();

                _.each(events, function(event) {

                    // get event time (moment) and natural language day
                    var eventTime = moment(event.get('eventTime'));
                    var day = date.groupingDayName(eventTime.toDate());

                    // format the display time
                    event.displayTime = eventTime.format("h:mm a");

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

                }, this);

                schedule.setGroupedEvents(days);
            },


            /**
             *
             */
            rebuildTemplate: function() {
                this.buildEventSchedule(this.schedule.getPrematchAndInplay());
                this.updateView();
            },


            /**
             * @param event
             */
            onGlobalTimerEvent: function(event) {
                if (this.priceChangedMap && this.priceChangedMap.length > 0) {
                    var scope = this;
                    _.each(this.priceChangedMap, function(priceObj){
                        priceObj.count++;
                        if (priceObj.count >= scope.priceChangeDurationInSecs) {
                            scope.hidePriceChange(priceObj);
                            var index = _.indexOf(scope.priceChangedMap, priceObj);
                            scope.priceChangedMap.splice(index,1);
                        }
                    });
                }
            },


            /**
             * @param format
             */
            onPriceFormatChange: function(format) {
                //AMERICAN DECIMAL FRACTION
                var scope = this;
                var scheduleEvents = this.schedule.getPrematchAndInplay();
                for (var i = 0; i < scheduleEvents.length; i++) {
                    var event = scheduleEvents[i];
                    _.each(event.Markets.models, function(market){
                        _.each(market.Selections.models, function(selection){
                            var priceEl = 'event-schedule-selection-'+selection.id;
                            var updatedEl = $('#'+priceEl);
                            var formattedPrice = scope.oddsFactory.getOdds(format,selection);
                            updatedEl.find('em').html(formattedPrice);
                        });
                    });
                }
            },


            /**
             * @param selection
             */
            onSelectionPriceChange: function(selection) {
                var eventId = selection.attributes.eventId;
                var selectionId = selection.attributes.id;
                var oldDecimalOdds = selection._previousAttributes.decimalOdds;

                var newDecimalOdds = selection.attributes.decimalOdds;
                var priceIsUp = false;

                if ( oldDecimalOdds > newDecimalOdds ) {
                    priceIsUp = true;
                }else if (oldDecimalOdds < newDecimalOdds ) {
                    priceIsUp = false;
                }

                var priceChangeObj = {};
                var priceFormat = App.globals.priceFormat;
                priceChangeObj.oddsToDisplay = this.oddsFactory.getOdds(priceFormat,selection);
                priceChangeObj.selectionId = selectionId;
                priceChangeObj.priceUp = priceIsUp;
                priceChangeObj.count = 0;
                this.trigger("onSelectionPriceChange", priceChangeObj);

                this.showPriceChange(priceChangeObj);
            },


            /**
             * @param priceObj
             */
            showPriceChange: function(priceObj) {
                this.priceChangedMap.push(priceObj);
                this.trigger("priceChange:show", priceObj);
            },


            /**
             * @param priceObj
             */
            hidePriceChange: function(priceObj) {
                this.trigger("priceChange:hide", priceObj);
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


            /**
             * @param event
             */
            onModelCouponsChange: function(event) {
                var coupons = event.attributes.coupons;
                this.trigger("onCouponsDataComplate", coupons);
            },


            /**
             * @param event
             */
            onModelCompetitionsChange: function(event) {
                var comps = event.attributes.competitions;
                this.trigger("onCompetitionsDataComplate", comps);
            },


            /**
             * @param event
             */
            onModelInplayChange: function(event) {
                var inplayEvents = event.attributes.inplay;
                this.trigger("onInplayDataComplate", inplayEvents);
            },


            /**
             * @param event
             */
            onModelPrematchChange: function(event) {
                console.log('onPrematch change');
            },


            /**
             * @param event
             */
            onIncidentChange: function(incident) {
                //Added here in the PM for validation and local dispatch to view. See _changed attribute.)
                if (incident.attributes.type != 'PeriodStart') {
                    this.trigger("onInplayIncidentChange", incident);
                }
            },


            /**
             * @param event
             */
            onModelParticipantsChange: function(event) {
                //Add validation to check id the event is in the schedule perhaps?
                //FIXME: Inefficient, this should be available in the template.
                //if ( event.attributes.inplay === true ) {
                this.trigger("onParticipantChange", event);
                //}
            },


            /**
             * @param event
             */
            onSelectionClick: function(eventId, selectionId) {
                var selectionObj = {};
                selectionObj.eventId = eventId;
                selectionObj.selectionId = selectionId;
                this.vent.trigger('selection:click', selectionObj);
            },


            /**
             * @param data
             * @param textStatus
             * @param jqXHR
             */
            onSportScheduleSuccess: function(data, textStatus, jqXHR) {
                this.buildEventScheduleForView(this.schedule);
                this.updateView();
            },


            /**
             * @param data
             * @param textStatus
             * @param jqXHR
             */
            onSportScheduleFailure: function(data, textStatus, jqXHR) {
                //Add logic for no data returned.
            }
        });
    });


