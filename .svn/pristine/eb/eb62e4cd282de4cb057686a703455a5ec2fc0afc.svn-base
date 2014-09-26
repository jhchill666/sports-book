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
                dependencies: 'vent, eventDetailsModel, eventScheduleModel, eventSchedulePM',
                eventIdInplay:0,
                eventId:null,
                event:null,
                thisEl:null,
                dt: new Date(),
                                
                ready: function(options) {
                	  _.bindAll(this, 'onIncidentChange', 'onGlobalTimerEvent');
                	  
                	  
                	 // var onIncidentChange = _.debounce(function() { this.onIncidentChange }, 2000);
                	  
                	  this.vent.bind('incidents:change', this.onIncidentChange);
                	  
                	  this.vent.bind('app:timer', this.onGlobalTimerEvent);

                	  this.eventDetailsModel.on("change:eventDetails", this.onEventDetailsChange, this);
                	 
                	  
					 
                },
                
                onGlobalTimerEvent: function(event) {   
					 		
					var s = this.dt.getSeconds() + 1;
					var m = this.dt.getMinutes();
					
					newclock = ( (m > 0 ? (m > 0 && m < 10 ? "0" : "") +  m + ":" : "00:") + (s < 10 ? "0" : "") + s);
					this.dt.setSeconds(s);
					
					var perc = (m / 100) * 90;
					$('#IPVpanel .time span').text(newclock);
					$('#IPVpanel .progressBar .activeBar').css({'width': perc+'%'});

                },
                
                onEventDetailsChange: function(event, ready) {
	                
	                
	                var myEvent = event.getEventDetails();
	                var template = _.template(tpl, { event: myEvent });
	                
	                if (myEvent.attributes.inplay == true) {
						this.$el.html(template);
					}
	                					
					
					// (this.$el != undefined) ? this.$el.html(template) : '';
	                                	                
	               /*
 
						
						var template = _.template(tpl, { event:myEvent });
						this.thisEl.html(template);
						
	                }
*/
	                
					/*
   
	               
	                
	                this.event = event;
	                
	                var eventId = event.id;
					var teams =  event.attributes.eventDetails.data.name.split('vs');
					var T1 = teams[0];
					var T2 = teams[1];
					// var isInplay = (this.event.attributes.eventDetails.attributes.genericInplayAttribs.clock == "") ? false : true;
					
					$('.teams .team:first-child .name').html(T1);
					$('.teams .team:first-child .score').html('');
					
					$('.teams .team:last-child .name').html(T2);
					$('.teams .team:last-child .score').html('');
					*/
					
					
                },
                
                
                onShow: function() {
                   
              
	                //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.
	                if (this.$el) {
	               		 this.thisEl = this.$el;
	                }
					
					function checkLoad() {
						$('.panelCover').fadeOut(400);
					 }
					checkLoad();

						
					// load tabs and inplay video
					var thisActive;
					
					$('.tab-bar ul li').click(function(e) {

						e.preventDefault();
						
						var thisId = $(this).find('a').attr('href');
						var openDiv = $('.openTab');
						
						if (thisId == '#close') {
													
							if ($('#IPVpanel').height() == 277) {
							
								thisActive = $('.tab-bar ul li.active');
								$('.tab-bar ul li').removeClass('active');
								
								$('#IPVpanel').animate({'height':'41px', 'margin-bottom':'0'}, 200);
								$(this).find('i').addClass('fa-flip-vertical');
								$(this).addClass('closed');
								
							} else {
								
								$('#IPVpanel').animate({'height':'277px', 'margin-bottom':'10px'}, 200);
								$(this).find('i').removeClass('fa-flip-vertical');
								thisActive.addClass('active');
								$(this).removeClass('closed');
							}
							
						} else {
							$('.tab-bar ul li').removeClass('active');
							$(this).addClass('active');
							$('.closed').removeClass('closed');

							openDiv.removeClass('openTab');
							openDiv.animate({'opacity':'0'}, 50);

							$(thisId).addClass('openTab');
							$(thisId).animate({'opacity':'1'}, 50);

							$('#IPVpanel').animate({'height':'277px', 'margin-bottom':'10px'}, 200);
							$('.fa-flip-vertical').removeClass('fa-flip-vertical');
						}

					});
					

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
						
					 var whistleSound, 
					 	 crowd,
					 	 goal,
					 	 heartbeat,
					 	 crowdAmbient, 
				   	     whistleSoundLoaded = false,
				   		 crowdSoundLoaded = false,
				   		 goalLoaded = false,
				   		 heartbeatLoaded = false,
				   		 crowdAmbientLoaded = false;
				   	
				   		   
					
//                    soundManager.setup({
//                      url: './js/libs/sound-manager/swf',
//                      flashVersion: 9,
//                      onready: function() {
//
//                            whistleSound = soundManager.createSound({
//                              id: 'whistle',
//                              url: './sounds/referee.mp3',
//                              autoLoad:true,
//                              onload: function() {
//                                whistleSoundLoaded = true;
//                                checkLoad();
//                              }
//                            });
//
//                            crowd = soundManager.createSound({
//                              id: 'crowd',
//                              url: './sounds/noise_of_the_crowd_stadium.wav',
//                              autoLoad:true,
//                              onload: function() {
//                                crowdSoundLoaded = true;
//                                checkLoad();
//                              }
//                            });
//
//                            goalSound = soundManager.createSound({
//                              id: 'goal',
//                              url: './sounds/goal.mp3',
//                              autoLoad:true,
//                              onload: function() {
//                                goalLoaded = true;
//                                checkLoad();
//                              }
//                            });
//
//                            heartbeat = soundManager.createSound({
//                              id: 'heartbeat',
//                              url: './sounds/heartbeat.mp3',
//                              autoLoad:true,
//                              onload: function() {
//                                heartbeatLoaded = true;
//                                checkLoad();
//                              }
//                            });
//
//                            crowdAmbient = soundManager.createSound({
//                              id: 'crowdAmbient',
//                              url: './sounds/crowd_ambient.wav',
//                              autoLoad:true,
//                              volume: 50,
//                              onload: function() {
//                                crowdAmbientLoaded = true;
//                                checkLoad();
//                              }
//                            });
//                     }});

					var goalSound;
					var thisDiv;
					var keyPressed;
					

					$(document).keypress(function(e) {
						if (e.keyCode != keyPressed){
							keyPressed = e.keyCode;

						  	switch (e.keyCode){

						  		case 113 :  // Q KEY == GOAL LEFT

						  		  removeShowing();

						  		 // goalSound.play();
						  		  thisDiv = $('.goal-left');
						  		  thisDiv.addClass('showing');
						  		  thisDiv.next().addClass('showing');

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

								break;
								case 81 :  // Shift+Q KEY == GOAL RIGHT

									removeShowing();
								//	goalSound.play();
									thisDiv = $('.goal-right');
									thisDiv.addClass('showing');
									thisDiv.next().addClass('showing');

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

								break;
								case 119 :  // W KEY == GOAL RIGHT

								 	removeShowing();
								 	// crowdAmbient.play();

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
								break;
								case 87 :  // Shift+W KEY == GOAL RIGHT

									removeShowing();
									// crowdAmbient.play();

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


								break;
								case 101 :  // E KEY == Dangerous Attack Left

									removeShowing();
									thisDiv = $('.dangerous-attack-left');
									thisDiv.addClass('showing');
									thisDiv.animate({ 'left':'-25', 'opacity':'1' }, 1500, 'easeOutElastic');


								break;
								case 69 :  // Shift+E KEY == Dangerous Attack Right

									removeShowing();
									thisDiv = $('.dangerous-attack-right');
									thisDiv.addClass('showing');
									thisDiv.animate({ 'right':'11', 'opacity':'1' }, 1500, 'easeOutElastic');

								break;
								case 97 :  // A KEY ==  Attack Left

									removeShowing();
									thisDiv = $('.attack-left');
									thisDiv.addClass('showing');
									thisDiv.animate({ 'left':'-25', 'opacity':'1' }, 1500, 'easeOutElastic');


								break;
								case 65 :  // Shift+A KEY == Attack Right

									removeShowing();
									thisDiv = $('.attack-right');
									thisDiv.addClass('showing');
									thisDiv.animate({ 'right':'11', 'opacity':'1' }, 1500, 'easeOutElastic');

								break;
								case 114 :  // R KEY == Possession Left

									removeShowing();
									thisDiv = $('.possession-left');
									thisDiv.addClass('showing');
									thisDiv.animate({ 'left':'-50', 'opacity':'1' }, 1000, 'easeOutBounce');

								break;
								case 82 :  // Shift+R KEY == Possession Right

									removeShowing();
									thisDiv = $('.possession-right');
									thisDiv.addClass('showing');
									thisDiv.animate({ 'right':'-46', 'opacity':'1' }, 1000, 'easeOutBounce');

								break;
								case 116 :  // T KEY == Possible Yellow Left

									removeShowing();
									thisDiv = $('.possible-yellow-left');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 84 :  // SHIFT+T KEY == Possible Yellow Right

									removeShowing();
									thisDiv = $('.possible-yellow-right');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 121 :  // Y KEY == Possible Yellow Right

									removeShowing();
									thisDiv = $('.yellow-left');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 89 :  // Shift+Y KEY == Possible Yellow Right

									removeShowing();
									thisDiv = $('.yellow-right');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 117 :  // U KEY == Possible Red Left

									removeShowing();
									thisDiv = $('.possible-red-left');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 85 :  // SHIFT+U KEY == Possible Red Right

									removeShowing();
									thisDiv = $('.possible-red-right');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');


								break;
								case 105 :  // I KEY == Red Left

									removeShowing();
									thisDiv = $('.red-left');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 73 :  // SHIFT+I KEY == Red Right

									removeShowing();
									thisDiv = $('.red-right');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');

								break;
								case 111 :  // O KEY == Start Second Left

									removeShowing();
									thisDiv = $('.start-second-left');
									// whistleSound.play();
									// crowd.play();

									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1', 'right':'52px'}, 500, 'easeOutBounce');

								break;
								case 79 :  // SHIFT+O KEY == Start Second Right

									removeShowing();
									thisDiv = $('.start-second-right');
									// whistleSound.play();
									// crowd.play();

									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1', 'left':'40px'}, 500, 'easeOutBounce');

								break;
								case 112 :  // P KEY == Corner Right

									removeShowing();
									thisDiv = $('.corner-right');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500);
									thisDiv.find($('.corner-arrow')).animate({'height':'170px', 'width': '198px'}, 600, 'easeOutBounce');

								break;
								case 80 :  // SHIFT+P KEY == Corner Left

									removeShowing();
									thisDiv = $('.corner-left');
									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1'}, 500);
									thisDiv.find($('.corner-arrow')).animate({'height':'170px', 'width': '198px'}, 600, 'easeOutBounce');

								break;
								case 91 :  // [ KEY == Corner Right

									removeShowing();
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

								break;
								case 123 :  // SHIFT+[ KEY == Corner Left

									removeShowing();
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

								break;
								case 93 :  // I KEY == Kick Off Left

									removeShowing();
									thisDiv = $('.kick-off-left');

									// whistleSound.play();
									// crowd.play();

									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1', 'right':'27px'}, 500, 'easeOutBounce');

								break;
								case 125 :  // SHIFT+I KEY == Kick Off Right

									removeShowing();
									thisDiv = $('.kick-off-right');

									// whistleSound.play();
									// crowd.play();

									thisDiv.addClass('showing');
									thisDiv.animate({'opacity':'1', 'left':'40px'}, 500, 'easeOutBounce');

								break;

								case 120 :  // Shift+U KEY == CLOSE Any
									removeShowing();
								break;

							} // switch
						}

						function removeShowing() {
							if ($('.showing') != undefined){
//								soundManager.stopAll();
								var oldShowing = $('.showing');
								oldShowing.removeClass('showing');
								oldShowing.animate({'opacity':'0'}, 200, function(){
									oldShowing.attr('style', '');
									oldShowing.children().attr('style', '');
									oldShowing.removeClass('showing');
								});
							}
						}

					});
					
                    
                },
                
                
                onIncidentChange : function(e) {
                
                	if (e.attributes.type) {
                	
                	
			                console.log('Incident!', e);
			                
							 // Freekick
							 // Corner
							 // DangerousAttack
							 // YellowCard
							 // Goal
							 // PeriodStart
							 
							 // ShotOffTarget
							 // Foul
							 
		                }
		                
		                if (e.attributes.type == 'Corner') {			// CORNERS -----------------------------------------------
			                if (e.attributes.side == "TEAM_A") { 		//team A
				                removeShowing();
								thisDiv = $('.corner-left');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500);
								thisDiv.find($('.corner-arrow')).animate({'height':'170px', 'width': '198px'}, 600, 'easeOutBounce');
			                } else {							// Team B
			                	removeShowing();
								thisDiv = $('.corner-right');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500);
								thisDiv.find($('.corner-arrow')).animate({'height':'170px', 'width': '198px'}, 600, 'easeOutBounce');
			                
			                }
		                }
		                
		                if (e.attributes.type == 'DangerousAttack') {	// dangerous attack -----------------------------------------------
		                 	if (e.attributes.side == "TEAM_A") { 		// team A
			                 	removeShowing();
								thisDiv = $('.dangerous-attack-left');
								thisDiv.addClass('showing');
								thisDiv.animate({ 'left':'-25', 'opacity':'1' }, 1500, 'easeOutElastic');
		                    } else {									// team B
								removeShowing();
								thisDiv = $('.dangerous-attack-right');
								thisDiv.addClass('showing');
								thisDiv.animate({ 'right':'11', 'opacity':'1' }, 1500, 'easeOutElastic');
		                    }
		                 
		                } 
		                
		                if (e.attributes.type == 'FreeKick') {			// Freekick -----------------------------------------------
		              	   if (e.attributes.side == "TEAM_A") { 		// team A
						  	    removeShowing();
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
						  	   	removeShowing();
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
				   	   			removeShowing();
								thisDiv = $('.yellow-left');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
						   	 } else {									// team B
							   	removeShowing();
								thisDiv = $('.yellow-right');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
						   	 }
		                 }
		                 
		                 if (e.attributes.type == 'RedCard') {			// RedCard -----------------------------------------------
		                	 if (e.attributes.side == "TEAM_A") { 		// team A
		         				
		         				removeShowing();
								thisDiv = $('.red-left');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
								
							} else {									// team B
		
								removeShowing();
								thisDiv = $('.red-right');
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1'}, 500, 'easeOutBounce');
							}
							
						}
						
						 if (e.attributes.type == 'Goal') {				// Goal -----------------------------------------------
							
							if (e.attributes.side == "TEAM_A") { 		// team A
								  removeShowing();
						  		  // goalSound.play();
						  		  thisDiv = $('.goal-left');
						  		  thisDiv.addClass('showing');
						  		  thisDiv.next().addClass('showing');
	
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
								removeShowing();
								//	goalSound.play();
								thisDiv = $('.goal-right');
								thisDiv.addClass('showing');
								thisDiv.next().addClass('showing');
	
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
				 				removeShowing();
								thisDiv = $('.start-second-left');
								// whistleSound.play();
								// crowd.play();
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1', 'right':'52px'}, 500, 'easeOutBounce');
						 	
						 	} else {											// kick off -------------------------------------------------------
					 			removeShowing();
								thisDiv = $('.kick-off-left');
	
								// whistleSound.play();
								// crowd.play();
								thisDiv.addClass('showing');
								thisDiv.animate({'opacity':'1', 'right':'27px'}, 500, 'easeOutBounce');
						 	}
						 	
					   }
						
							
					 function removeShowing() {
						if ($('.showing') != undefined){
							//	soundManager.stopAll();
							var oldShowing = $('.showing');
							oldShowing.removeClass('showing');
							oldShowing.animate({'opacity':'0'}, 200, function(){
								oldShowing.attr('style', '');
								oldShowing.children().attr('style', '');
								oldShowing.removeClass('showing');
							});
						}
					
					 }
                	
                	console.log('Incident::', e);
	                
                }


            });

        });
    

