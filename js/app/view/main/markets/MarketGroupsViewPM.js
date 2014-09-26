define(['marionette'],
        function(Marionette) {

            return Marionette.Controller.extend({
                dependencies: 'marketGroupsModel, eventDetailsModel, commands, vent',
                marketGroupDataComplete:false,


                /**
                 * @param options
                 */
                ready: function(options) {

                },


                /**
                 *
                 */
                getData: function() {
                    var sport = App.globals.sport;
                    var locale = App.globals.locale;
                    this.commands.execute('command:getSportDisplayTemplate', sport, 6, locale );
                },


                /**
                 * @param sport
                 */
                onSportChange: function(sport) {
                    this.getData();
                },


                /**
                 * @param event
                 */
                onEventDetailsChange: function(event) {
                    if (!this.marketGroupDataComplete) {
                        this.getData();   
                    }
                    else {
                        //Already got data so re-count event details info.
                        this.countMarketGroupsFromEventDetails();
                    }
                },



                
                onMarketGroupsChange: function(model) {
                    this.marketGroupDataComplete = true;
                    this.countMarketGroupsFromEventDetails();
                },
                
                updateView: function(groups) {
                    this.trigger("onDataComplete", groups);
                },
                
                resetMarketGroupCount: function() {
                    var marketGroups = this.marketGroupsModel.getMarketGroup();
                    for (var i = 0; i < marketGroups.length; i++) {
                        var group = marketGroups[i];
                        group.count = 0;
                    }
                },
                
                countMarketGroupsFromEventDetails: function() {
                    var totalMarketCount = this.eventDetailsModel.getNumberOfMarkets();
                    var markets = this.eventDetailsModel.getMarkets();
                    var marketGroups = this.marketGroupsModel.getMarketGroup();
                    var displayTemplates = this.marketGroupsModel.getDisplayTemplates();
                    
                    this.resetMarketGroupCount();
                 
                    if (markets != null) {
                    
	                    for (var i = 0; i < markets.length ; i++) {
	                        var market = markets.models[i];
	                        for (var j = 0; j < displayTemplates.length; j++) {
	                            var template = displayTemplates[j];
	                            if (template.type == market.attributes.type) {
	                                for (var k = 0; k < template.groups.length; k++) {
	                                    var templateObj = template.groups[k];
	                                    for (var m = 0; m < marketGroups.length; m++) {
	                                        var marketGroup = marketGroups[m];
	                                        if (marketGroup.type == templateObj.code ) {
	                                            marketGroup.count ++;
	                                            marketGroup.marketTypes[template.type] = template.type;
	                                            break;
						}
	                                        if (marketGroup.type == 'ALL') {
	                                            marketGroup.count = totalMarketCount;
	                                        }
	                                    }
	                                }
	                                break;
	                            }
	                        }
	                    }
                    }
                    
                    this.updateView(marketGroups);
                },
                
                filterByMarketGroup: function(marketGroupType) {
                    var filterObj = {};
                    filterObj.marketGroups = this.marketGroupsModel.getMarketGroup();
                    filterObj.marketGroupType = marketGroupType;
                    this.vent.trigger('marketGroup:filter',filterObj);
                }
                
                

            });
        });