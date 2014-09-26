/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette', 'easing',
    'text!app/view/sidebarIPV/IPVpanelBaseball.tpl.html'
],
        function(Marionette, easing, tpl) {
            return Marionette.View.extend({
                //dependencies: 'apiService, commands',

                template: _.template(tpl),
				
				 onShow: function() {
                
                    //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.
                  //  this.$el.html(this.template());
                    
                },
				
				// Needs hooking up when we want to include IPV
                afterShow: function() {
                
                    //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.
                    this.$el.html(this.template());
                    
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
					
					
					var dt = new Date();
					dt.setMinutes(0);
					dt.setSeconds(0);
						
                    
                    setInterval(function() {
						$('.cam-1').animate({'opacity':'1'}, 50, function() {
							$('.cam-1').animate({'opacity':'0'}, 80);
						});
					}, 2500);

					setInterval(function() {
						$('.cam-2').animate({'opacity':'1'}, 50, function() {
							$('.cam-2').animate({'opacity':'0'}, 80);
						});
					}, 3250);
					
						
					setInterval(function() {
						$('.cam-3').animate({'opacity':'1'}, 50, function() {
							$('.cam-3').animate({'opacity':'0'}, 80);
						});
					}, 4698);
					
					setInterval(function() {
						$('.cam-4').animate({'opacity':'1'}, 50, function() {
							$('.cam-4').animate({'opacity':'0'}, 80);
						});
					}, 5290);
					
					setInterval(function() {
						$('.cam-5').animate({'opacity':'1'}, 50, function() {
							$('.cam-5').animate({'opacity':'0'}, 80);
						});
					}, 2895);
					
					setInterval(function() {
						$('.cam-6').animate({'opacity':'1'}, 50, function() {
							$('.cam-6').animate({'opacity':'0'}, 80);
						});
					}, 4000);
					
					var keyPressed;
					var count = 1;
						
					$(document).keypress(function(e) {
							
						  	switch (e.keyCode){
						  		case 113 :  // Q KEY == STRIKE1
						  		
						  		if (e.keyCode != keyPressed){
							  		keyPressed = e.keyCode;
						  			
							  		removeShowing();
							  		
							  		$('.strike').addClass('showing');
							  		$('.strike').find($('.statusText')).html('STRIKE '+count);
							  		$('.strike').find($('.glove-inner')).animate({'bottom':'-46px', 'right':'0px', 'opacity':'1'}, 200, 'easeInCirc');
									$('.strike').find($('.ball')).delay(100).animate({'opacity':'1', 'right':'-54px'}, 200, function() {
										$('.glove-ball').animate({'opacity':'1'}, 0);
										$('.glove').animate({'opacity':'0'}, 0);
										$('.strike').find($('.ball')).animate({'opacity':'0'}, 100);
										$('.strike').find($('.flash')).delay(20).animate({'opacity':'1'}, 150);
									});
									
									count = count+1
									if(count == 4){
										count = 1;
									}
								}
								
						  		break;
						  		case 119 :  // W KEY == toggle-top
						  			
						  			
						  			if ($('.toggle-top').hasClass('showing')) {
						  				$('.toggle-top').animate({'opacity':'0'}, 200, function() {
							  				$('.toggle-top').removeClass('showing');
						  				});
						  			} else {
							  			$('.toggle-top').addClass('showing');
						  				$('.toggle-top').animate({'opacity':'1'}, 200);
						  			}
						  		
						  		
						  		break;
						  		case 101 :  // E KEY == toggle-right
						  		
						  			if ($('.toggle-right').hasClass('showing')) {
						  				$('.toggle-right').animate({'opacity':'0'}, 200, function() {
							  				$('.toggle-right').removeClass('showing');
						  				});
						  			} else {
							  			$('.toggle-right').addClass('showing');
						  				$('.toggle-right').animate({'opacity':'1'}, 200);
						  			}
						  		
						  		
						  		break;
						  		case 114 :  // R KEY == toggle-bottom
						  		
						  			if ($('.toggle-bottom').hasClass('showing')) {
						  				$('.toggle-bottom').animate({'opacity':'0'}, 200, function() {
							  				$('.toggle-bottom').removeClass('showing');
						  				});
						  			} else {
							  			$('.toggle-bottom').addClass('showing');
						  				$('.toggle-bottom').animate({'opacity':'1'}, 200);
						  			}
						  		
						  		
						  		break;
						  		case 116 :  // T KEY == toggle-left
						  		
						  			if ($('.toggle-left').hasClass('showing')) {
						  				$('.toggle-left').animate({'opacity':'0'}, 200, function() {
							  				$('.toggle-left').removeClass('showing');
						  				});
						  			} else {
							  			$('.toggle-left').addClass('showing');
						  				$('.toggle-left').animate({'opacity':'1'}, 200);
						  			}
						  		
						  		
						  		break;
						  		case 121 : // Y KEY == Ball
							  		
							  		if (e.keyCode != keyPressed){
							  			removeShowing();
							  			keyPressed = e.keyCode;
							  			
							  			$('.ball').addClass('showing');
							  			
							  			
							  			$('.ball').find($('.gif')).animate({'left':'40px'}, 600, 'easeOutExpo').animate({'left':'0px'}, 400, 'easeInExpo');
								  		
								  		$('.ball').find($('.gif > div')).animate({'background-size':'50%'}, 1000, 'easeInSine');
								  		
								  		
								  		setTimeout(function() {
									  		$('.ball').find($('.splash, .lbl')).animate({'opacity':'1'}, 100);
								  		}, 1000);
							  		}
						  		
						  		
						  		break;
						  		case 117 : 
						  			
						  			if (e.keyCode != keyPressed){
							  			removeShowing();
							  			keyPressed = e.keyCode;
							  			
							  			$('.out').addClass('showing');
							  			$('.out').find($('.gif')).animate({'background-size':'60%'}, 1000, 'easeInCirc' );
								  		
								  		setTimeout(function() {
									  		$('.out').find($('.splash, .lbl')).animate({'opacity':'1'}, 100);
								  		}, 950);
							  		}

						  		
						  		break;
						  		case 120 :  // X KEY == CLOSE Any
									removeShowing();
									keyPressed = e.keyCode;
								break;
						
						  	}
						  	
						  	function removeShowing() {
								if ($('.showing') != undefined){
									var oldShowing = $('.showing');
									oldShowing.removeClass('showing');
									oldShowing.animate({'opacity':'0'}, 200, function(){
										oldShowing.attr('style', '');
										oldShowing.children().attr('style', '');
										oldShowing.children().children().attr('style', '');
										oldShowing.removeClass('showing');
									});
								}
								
							}
						  		
					});
					
            }
        });
        
        });

