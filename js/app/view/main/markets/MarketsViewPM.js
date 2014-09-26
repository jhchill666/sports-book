define(['marionette',
    'app/collection/MarketsCollection'
],
        function(Marionette, MarketsCollection) {

            return Marionette.Controller.extend({


                dependencies: 'socket=socketService, details=eventDetailsModel, oddsFactory, vent, commands',
                unfilteredMarkets:[],
                groupType: 'ALL',


                /**
                 * @param options
                 */
                ready: function(options) {
                    _.bindAll(this,'onFilterByMarketType');

                    this.details.on("change:eventDetails", this.onEventDetailsChange, this);
                    this.details.on("change:participants", this.onParticipantsChange, this);

//                    this.vent.on('marketGroup:filter', this.onFilterByMarketType);
                },


                /**
                 * @param filterObj
                 */
                onFilterByMarketType: function(filterObj) {
                    if (filterObj.marketGroupType == this.groupType) return;
                    this.groupType = filterObj.marketGroupType;


                    var marketTypes =[];
                    var marketType = filterObj.marketGroupType;
                    var eventDetails = this.details.getEventDetails();

                    if (marketType != 'ALL') {
                        for (var m = 0; m < filterObj.marketGroups.length; m++) {
                            var marketGroup = filterObj.marketGroups[m];
                            if ( marketGroup.type == marketType ) {
                                marketTypes = marketGroup.marketTypes; 
                                break;
                            }
                        }
                       
                        var filteredEvents = _.filter(this.unfilteredMarkets, 
                            function(market) { 
                                return _.has(marketTypes, market.type)
                            });
                    
//                        eventDetails.Markets = new MarketsCollection(filteredEvents);
                        eventDetails.Markets.byTypes(marketGroup.marketTypes);
                        this.updateEventView(eventDetails);
                        
                    }
                    else {
                        eventDetails.attributes.markets = new MarketsCollection(this.unfilteredMarkets);
                        this.updateEventView(eventDetails);
                    }
                },


                /**
                 * @param event
                 */
                onEventDetailsChange: function(event) {
                    var eventDetails = this.details.getEventDetails();

                    this.unfilteredMarkets = eventDetails.Markets;
                    this.updateEventView(eventDetails);
                    this.commands.execute('command:subscribe:eventDetails', eventDetails.id);
                },


                /**
                 * @param event
                 */
                onParticipantsChange: function(event) {
                    var participantA = event.getParticipantA();
                    var participantB = event.getParticipantB();
                },


                /**
                 * @param eventId
                 */
                getData: function(options) {
                    this.commands.execute('command:getEvent', options.eventId, 6, options.locale);
                },


                /**
                 * @param eventDetails
                 */
                updateEventView: function(eventDetails) {
                    this.trigger("onDataComplete", eventDetails);
                }

            });
        });


