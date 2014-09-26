/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette', 'easing', 'libs/rotate', 'libs/soundmanager2/script/soundmanager2',
    'text!app/view/sidebarIPV/IPVpanelFootball.tpl.html'
],
        function(Marionette, easing, rotate, soundManager, tpl) {
            return Marionette.View.extend({


                template: _.template(tpl),
                dependencies: 'vent, eventDetailsModel, eventScheduleModel, eventSchedulePM',
                eventIdInplay:0,
                incidentIds: {},
                eventId:null,
                event:null,
                thisEl:null,
                timer:'',


                events: {
                    'click .tab-bar ul li' : 'swapTabs'
                },


                /**
                 * @param options
                 */
                ready: function(options) {
                    _.bindAll(this, 'onIncidentChange');
                    this.vent.bind('incidents:change', this.onIncidentChange, this);
                    this.eventDetailsModel.on("change:eventDetails", this.onEventDetailsChange, this);
                },


                /**
                 * @param e
                 */
                swapTabs : function(e) {
						
					e.preventDefault();
										
					var $this = $(e.currentTarget);
				
					var thisId = $this.find('a').attr('href');
					var openDiv = $('.openTab');
					
					if (thisId == '#close') {
												
						if ($('#IPVpanel').height() == 269) {
						
							thisActive = $('.tab-bar ul li.active');
							$('.tab-bar ul li').removeClass('active');
							
							$('#IPVpanel').animate({'height':'41px', 'margin-bottom':'0'}, 200, function() {
								$('#IPVpanel').css({'overflow' : 'hidden'});
							});
							
							$this.find('i').addClass('fa-flip-vertical');
							$this.addClass('closed');
							
						} else {
							
							$('#IPVpanel').animate({'height':'269px', 'margin-bottom':'10px'}, 200).css({'overflow' : 'hidden'});
							$this.find('i').removeClass('fa-flip-vertical');
							thisActive.addClass('active');
							$this.removeClass('closed');
						}
						
					} else {
						$('.tab-bar ul li').removeClass('active');
						$this.addClass('active');
						$('.closed').removeClass('closed');

						openDiv.removeClass('openTab');
						openDiv.animate({'opacity':'0'}, 50);

						$(thisId).addClass('openTab');
						$(thisId).animate({'opacity':'1'}, 50);

						$('#IPVpanel').animate({'height':'269px', 'margin-bottom':'10px'}, 200);
						$('.fa-flip-vertical').removeClass('fa-flip-vertical');
					}
	
	            },
                
                onEventDetailsChange: function(event, ready) {
	                
	                var myEvent = event.getEventDetails();
	                this.eventId = myEvent.attributes.id;
	                

	                if (myEvent.attributes.inplay == true) {
						this.$el.html(this.template({ event: myEvent }));
					}
					
                },
                
                
                onShow: function() {
                    
                },
                
                previousIncidentAttributes: {id: ''},
                
                onIncidentChange : function(e) {
                
               		console.log('Incident::', e);
                 
                	$.fn.pulse = function(options) {

					    var options = $.extend({
					        times: 1000,
					        duration: 1000
					    }, options);

					    var period = function(callback) {
					        $(this).animate({opacity: 0.5}, options.duration, function() {
					            $(this).animate({opacity: 1}, options.duration, callback);
					        });
					    };
					    return this.each(function() {
					        var i = +options.times, self = this,
					        repeat = function() { --i && period.call(self, repeat) };
					        period.call(this, repeat);
					    });
					};
					
                    if ( e.attributes.eventId != this.eventId ) {
                        return;
                    }


                    if (_.has(this.incidentIds, e.id)) return;
                    this.incidentIds[e.id] = true;
                    

                	if (e.attributes.type) {

							 if (e.attributes.id == this.previousIncidentAttributes.id) {
								 return;
								 removeShowing();
							 } else {
								 this.previousIncidentAttributes.id = e.attributes.id;
								 removeShowing();
							 }

		                } else {
			                return;
		                }

		                // set scroer name
		                if (e.attributes.inplayAttributes.SCORER != undefined) {
			                var scorerName = e.attributes.inplayAttributes.SCORER
		                } else {
			                var scorerName = '';
		                }
		                
		                
		                if (e.attributes.type == 'Corner') {			// CORNERS -----------------------------------------------
			                if (e.attributes.side == "TEAM_A") { 		//team A
				              
								thisDiv = $('.corner-left');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500);
								thisDiv.find($('.corner-arrow')).animate({'height':'170px', 'width': '198px'}, 600, 'easeOutBounce');
			                } else {								// Team B
								thisDiv = $('.corner-right');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500);
								thisDiv.find($('.corner-arrow')).animate({'height':'170px', 'width': '198px'}, 600, 'easeOutBounce');
			                
			                }
		                }
		                
		                if (e.attributes.type == 'DangerousAttack') {	// dangerous attack -----------------------------------------------
		                 	if (e.attributes.side == "TEAM_A") { 		// team A
								thisDiv = $('.dangerous-attack-left');
								thisDiv.addClass('showing');
								thisDiv.animate({ 'left':'-25', 'opacity':'1' }, 1500, 'easeOutElastic');
		                    } else {									// team B
								thisDiv = $('.dangerous-attack-right');
								thisDiv.addClass('showing');
								thisDiv.animate({ 'right':'11', 'opacity':'1' }, 1500, 'easeOutElastic');
		                    }
		                 
		                } 
		                
		                if (e.attributes.type == 'FreeKick') {			// Freekick -----------------------------------------------
		              	   if (e.attributes.side == "TEAM_A") { 		// team A
								thisDiv = $('.free-kick-left');
								// whistleSound.play();
								// crowd.play();
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
								var radarEl = thisDiv.find($('.radar-left'));
								function radar(){
									return radarEl.animate({'zoom':'2', 'opacity':'0', 'margin-left': '-10px'} , 1000, function() {
										radarEl.animate({'zoom':'1', 'opacity':'1', 'margin-left': '0px'} , 0);
									});
									thisDiv.pulse({times: 1, duration: 500});
								}
								intervalLeft = setInterval(radar, 1000);
										
					  	   } else {										// team B
								thisDiv = $('.free-kick-right');
								// whistleSound.play();
								// crowd.play();
	
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
								var radarEl = thisDiv.find($('.radar-right'));
								function radar(){
									return radarEl.animate({'zoom':'2', 'opacity':'0', 'margin-right': '-30px'} , 1000, function() {
										radarEl.animate({'zoom':'1', 'opacity':'1', 'margin-right': '0px'} , 0);
									});
									thisDiv.pulse({times: 1, duration: 500});
								}
								intervalRight = setInterval(radar, 1000);
					  	   }
					  	   
		                 } 
		                 
		                 if (e.attributes.type == 'YellowCard') {		// YellowCard -----------------------------------------------
		               	    if (e.attributes.side == "TEAM_A") { 		// team A
		               	    
								thisDiv = $('.yellow-left');
								
								if (e.attributes.inplayAttributes.SCORER) {
			               	    	$('.yellow-left .contents .sm').html(scorerName);
		               	    	}
		               	    	
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
								
						   	 } else {				
						   	 
						   	 											// team B
								thisDiv = $('.yellow-right');
								
								if (e.attributes.inplayAttributes.SCORER) {
			               	    	$('.yellow-right .contents .sm').html(scorerName);
		               	    	}
		               	    	
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
								
						   	 }
		                 }
		                 
		                 if (e.attributes.type == 'RedCard') {			// RedCard -----------------------------------------------
		                	 if (e.attributes.side == "TEAM_A") { 		// team A
								thisDiv = $('.red-left');
								
			               	    $('.red-left .contents .sm').html(scorerName);


								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
								
							} else {
							
								
			               	    $('.red-right .contents .sm').html(scorerName);
								
								// team B
		
								thisDiv = $('.red-right');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
							}
							
						}
						
						 if (e.attributes.type == 'Goal') {				// Goal -----------------------------------------------
							
							if (e.attributes.side == "TEAM_A") { 		// team A
						  		  // goalSound.play();
						  		  thisDiv = $('.goal-left');
						  		  thisDiv.addClass('showing');
						  		  thisDiv.next().addClass('showing');
						  		  
						  		  $('.goal-left-2 .sm').html(scorerName);
						  		  
							  	  var rotationLeft = function(){
									   $(".team .flash.left").rotate({
									      angle:0,
									      animateTo:360
									   }, 800);
	
									   $('#inplay .teams .team:first-child .score').html(parseInt($('#inplay .teams .team:first-child .score').html()) + 1);
									   $("#inplay .flash.left").animate({'opacity':'1', 'zoom':'1.4', 'right': '-17px', 'top': '-11px'}, 400).animate({'opacity':'0', 'zoom':'1', 'right': '-11px', 'top': '-5px'}, 400);
								   }
	
									thisDiv.animate({ 'left':'-43', 'opacity':'1' }, 1200, 'easeInCirc');
									setTimeout(function() {
										thisDiv.animate({'opacity':'0'}, 400);
										$('.goal-left-2').animate({ 'opacity':'1', 'zoom': '1.2', 'left': '-87px', 'top': '-12px' }, 200).find($('.lg')).delay(100).animate({'opacity':'1', 'padding-right': '32.5%'}, 500).find($('.ball')).delay(800).animate({'opacity':'0'}, 600); // easeOutElastic
										$('.goal-left-2').find($('.confetti')).delay(100).animate({'opacity':'0.9'}, 800, function() {
											rotationLeft();
										});
									}, 1200);
									
									
									
										
							} else {									// team B
								//	goalSound.play();
								thisDiv = $('.goal-right');
								thisDiv.addClass('showing');
								thisDiv.next().addClass('showing');
								
								$('.goal-right-2 .sm').html(scorerName);
	
								var rotationRight = function (){
								   $(".team .flash.right").rotate({
								      angle:0,
								      animateTo:360
								   }, 800);
	
								   $('#inplay .teams .team:last-child .score').html(parseInt($('#inplay .teams .team:last-child .score').html()) + 1);
								   $("#inplay .flash.right").animate({'opacity':'1', 'zoom':'1.4', 'right': '-17px', 'top': '-11px'}, 400).animate({'opacity':'0', 'zoom':'1', 'right': '-11px', 'top': '-5px'}, 400);
	
								}
	
								thisDiv.animate({ 'right':'-48', 'opacity':'1' }, 1200, 'easeInCirc');
	
								setTimeout(function() {
									thisDiv.animate({'opacity':'0'}, 400);
									 $('.goal-right-2').animate({ 'opacity':'1', 'zoom': '1.2', 'right': '-95px', 'top': '-12px' }, 200).find($('.lg')).delay(100).animate({'opacity':'1', 'padding-left': '31.5%'}, 500).find($('.ball')).delay(800).animate({'opacity':'0'}, 600); // easeOutElastic
									 $('.goal-right-2').find($('.confetti')).delay(100).animate({'opacity':'0.9'}, 800, function() {
										rotationRight();
	
									});
								 }, 1200);
							}
							
						}
						
					
					   if (e.attributes.type == 'PeriodStart') {				// start second half -----------------------------------------------
						 	if (e.attributes.period == "HT") { 					// start second half 
								thisDiv = $('.start-second-left');
								// whistleSound.play();
								// crowd.play();
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1', 'right':'52px'}, 500, 'easeOutBounce');
						 	
						 	} else {											// kick off -------------------------------------------------------
								thisDiv = $('.kick-off-left');
	
								// whistleSound.play();
								// crowd.play();
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1', 'right':'27px'}, 500, 'easeOutBounce');
						 	}
						 	
					   }
					  
					   if (e.attributes.type == 'Penalty') {				// penatlies -----------------------------------------------
						 if (e.attributes.side == "TEAM_A") { 

								thisDiv = $('.penalty-left-back');
								thisDiv.addClass('showing');
								thisDiv.find($('.penalty-left')).animate({'opacity' : '1', 'margin-top': '0'}, 400);
								thisDiv.animate({ 'left':'58', 'opacity':'1' }, 1000, 'easeInCirc', function() {

									thisDiv.find($('.lg, .sm')).animate({'opacity' : '1'}, 300);
									thisDiv.find($('.penalty-left .penalty-left-inner')).animate({'opacity' : '1'}, 100, 'easeOutBack', function() {
										// heartbeat.play();
										thisDiv.find($('.penalty-left .penalty-left-inner')).animate({'opacity' : '0.7'}, 500, 'easeOutBack', function() {
											thisDiv.find($('.penalty-left .penalty-left-inner')).pulse({duration:550});
										});
									});
								});
									
							} else {
											
								thisDiv = $('.penalty-right-back');
								thisDiv.addClass('showing');
								thisDiv.find($('.penalty-right')).animate({'opacity' : '1', 'margin-top': '0'}, 400);
								thisDiv.animate({ 'right':'49', 'opacity':'1' }, 1000, 'easeInCirc', function() {
	
									thisDiv.find($('.lg, .sm')).animate({'opacity' : '1'}, 300);
	
									thisDiv.find($('.penalty-right .penalty-right-inner')).animate({'opacity' : '1'}, 100, 'easeOutBack', function() {
										// heartbeat.play();
										thisDiv.find($('.penalty-right .penalty-right-inner')).animate({'opacity' : '0.7'}, 500, 'easeOutBack', function() {
											thisDiv.find($('.penalty-right .penalty-right-inner')).pulse({duration:550});
											// thisDiv.find($('.lg, .sm')).pulse({duration:600});
	
										});
									});
								});
	
						}
					 }
					 
					  if (e.attributes.type == 'Foul') {
						  
						  // Do foul stuff
						  
					  }
					 
					 if (e.attributes.type == 'PenaltyMissed') {
						 removeShowing();
					 }
					 
					 clearTimeout(this.timer);
					 
					 if (e.attributes.type != 'Penalty' ) {		// dont clear penalties after timeout
							  
						  this.timer = setTimeout(function() {
							 removeShowing();
						 }, 8000);

					 }
					 

					 function removeShowing() {
						if ($('.showing') != undefined){
							//	soundManager.stopAll();
							var oldShowing = $('.showing');
							oldShowing.removeClass('showing');
							oldShowing.animate({'opacity':'0'}, 100, function(){
								oldShowing.attr('style', '');
								oldShowing.children().attr('style', '');
								oldShowing.children().children().attr('style', '');
								oldShowing.removeClass('showing');
							});
						}
					
					 }
                }
            });

        });
    

