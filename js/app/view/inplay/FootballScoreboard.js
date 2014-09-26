/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/inplay/FootballScoreboard.tpl.html'
],
        function (Marionette, tpl) {
            return Marionette.View.extend({


                dependencies: 'vent, eventScheduleModel, eventModel',
                eventIdInplay: 0,
                event: null,


                /**
                 * @param options
                 */
                ready: function (options) {
                    _.bindAll(this, 'onIncidentChange');

                    this.vent.bind('incidents:change', this.onIncidentChange);
                    this.vent.bind('app:timer', this.onGlobalTimerEvent);
                },


                onIncidentChange: function (incident) {
                   
                    if (incident.attributes.eventId == this.eventIdInplay) {
                        
                        _.each(incident.attributes.inplayAttributes, function(lbl, att) {
                        
	                        var teamBox = $('.inplay-box .teams'); 
	                        
	                        switch (att) {
	                        										// update scores
		                         case 'GOAL_SCORE':
		                       	
		                       	if (lbl.indexOf(':') > -1) {
		                       	 	var scores = lbl.split(':');
		                       	 } else {
			                       	var scores = lbl.split('-');
		                       	 }
		                       	 
		                       	 teamBox.find($('.home .goal')).html((scores[0] != '') ? scores[0] : '0');
		                       	 teamBox.find($('.away .goal')).html((scores[1] != '') ? scores[1] : '0');
		                       	
		                       	 break;
		                       	 case 'CORNER_SCORE':				// update corners
		                       	 
		                       	 if (lbl.indexOf(':') > -1) {
								   	 var corners = lbl.split(':');
								 } else {
			                       	 var corners = lbl.split('-');
		                       	 }

		                       	 teamBox.find($('.home .corner')).html((corners[0] != '') ? corners[0] : '0');
		                       	 teamBox.find($('.away .corner')).html((corners[1] != '') ? corners[1] : '0');
		                       	 
		                       	 break;
		                       	 case 'PENALTY_SCORE':				// update penalties
		                       	 
		                       	 if (lbl.indexOf(':') > -1) {
		                       	 	var penaltys = lbl.split(':');
		                       	 } else {
			                       	 var penaltys = lbl.split('-');
		                       	 }
		                       	 
		                       	 teamBox.find($('.home .penalty')).html((penaltys[0] != '') ? penaltys[0] : '0');
		                       	 teamBox.find($('.away .penalty')).html((penaltys[1] != '') ? penaltys[1] : '0');
							   	
							   	 break;
							   	 case 'REDCARD_SCORE':				// update red card
							   
							   	 if (lbl.indexOf(':') > -1) {
							   		 var redCard = lbl.split(':');
							     } else {
								   	var redCard = lbl.split('-');
							   	 }
							   	 
		                       	 teamBox.find($('.home .red')).html((redCard[0] != '') ? redCard[0] : '0');
		                       	 teamBox.find($('.away .red')).html((redCard[1] != '') ? redCard[1] : '0');
		                       	 
		                       	 break;
		                       	 case 'YELLOWCARD_SCORE':			// update yellow
							   	 
							   	 if (lbl.indexOf(':') > -1) {
							   		 var yellowCard = lbl.split(':');
							   	 } else {
								   	var yellowCard = lbl.split('-');
							   	 }
							   	 
		                       	 teamBox.find($('.home .yellow')).html((yellowCard[0] != '') ? yellowCard[0] : '0');
		                       	 teamBox.find($('.away .yellow')).html((yellowCard[1] != '') ? yellowCard[1] : '0');
		                        
	                        }
	                        
						});

					}
                },
                
                onShow: function () {

                    this.eventIdInplay = this.options.eventId;
                    this.event = this.eventScheduleModel.findEventById(this.eventIdInplay);
                    var currentIncidentsModel = this.eventModel.getIncidentsForEvent(this.eventIdInplay);

                    if (this.event != undefined && this.event.attributes != undefined) {
					

						var currentStats = currentIncidentsModel.attributes.inplayAttributes;
						
                        var template = _.template(tpl, {event: this.event, currentStats: currentStats});
                        (this.event.attributes.inplay == true) ? this.$el.html(template) : this.$el.html('');
                    }
                }
            });
        });

