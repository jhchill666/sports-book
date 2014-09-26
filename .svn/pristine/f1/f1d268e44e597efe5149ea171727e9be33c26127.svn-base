/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette', 'easing',
    'text!app/view/sidebarIPV/IPVpanelBasketball.tpl.html'
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
						
					var keyPressed;
						
					$(document).keypress(function(e) {
							
							if (e.keyCode != keyPressed){
							
								keyPressed = e.keyCode;
								
							  	switch (e.keyCode){
							  	
							  		case 113 :  // Q KEY == STRIKE1

								  		removeShowing();
								  		$('.basket').addClass('showing');
								  		$('.basket').animate({'opacity':'1'}, 200);
								  		$('.basket').find($('.cover')).animate({'opacity':'0.5'}, 500);
								  		$('.basket').find($('.animated-ball')).animate({'left': '185px', 'top': '47px'}, 500, 'easeOutExpo');
								  		$('.basket').find($('.empty-basket')).delay(500).animate({'opacity':'0'}, 100);
									  	$('.basket').find($('.dunk-basket')).delay(250).animate({'opacity':'1'}, 50, 'easeOutExpo').delay(400).animate({'opacity':'0'}, 500);
									  	$('.basket-3').delay(250).animate({'opacity':'1'}, 1000);
									  	$('.basket').find($('.name, .action')).delay(600).animate({'opacity':'1', 'margin-left':'12px'}, 400, 'easeOutExpo');
									  	
									
							  		break;
							  		
							  		
							  		case 81 :  // Shift+Q KEY == STRIKE RIGHT

								  		removeShowing();
								  		$('.basket-opposite').addClass('showing');
								  		$('.basket-opposite').animate({'opacity':'1'}, 200);
								  		$('.basket-opposite').find($('.cover')).animate({'opacity':'0.5'}, 500);
								  		$('.basket-opposite').find($('.animated-ball')).animate({'left': '30px', 'top': '47px'}, 500, 'easeOutExpo');
								  		$('.basket-opposite').find($('.empty-basket')).delay(500).animate({'opacity':'0'}, 100);
									  	$('.basket-opposite .dunk-basket').delay(250).animate({'opacity':'1'}, 50, 'easeOutExpo').delay(400).animate({'opacity':'0'}, 500);
									  	$('.basket-opposite .basket-3').delay(250).animate({'opacity':'1'}, 1000);
									  	$('.basket-opposite').find($('.action')).delay(600).animate({'opacity':'1', 'margin-left':'191px'}, 400, 'easeOutExpo');
									  	$('.basket-opposite').find($('.name')).delay(600).animate({'opacity':'1', 'margin-right':'65px'}, 400, 'easeOutExpo');
									  	
									
							  		break;

							  		
							  		
							  		case 119 :  // W KEY == toggle-top
							  		
							  			removeShowing();
							  			$('.bounce').addClass('showing');
							  			$('.bounce').animate({'opacity':'1'}, 200);
							  			$('.bounce').find($('.cover')).animate({'opacity':'0.5'}, 500);
							  			$('.bounce').find($('.animated-ball')).animate({'left': '135px', 'top': '67px'}, 500, 'easeOutExpo');
							  			$('.bounce').find($('.empty-basket-b')).delay(350).animate({'opacity':'0'}, 100);
							  			$('.bounce').find($('.bounce-basket')).delay(250).animate({'opacity':'1'}, 50, 'easeOutExpo');
							  			$('.bounce').find($('.ex-point')).delay(300).animate({'opacity':'1', 'top': '55px'}, 500, 'easeOutCirc');
							  			$('.bounce').find($('.name, .action')).delay(600).animate({'opacity':'1', 'margin-left':'2px'}, 400, 'easeOutExpo');
							  		
							  		break;
							  		
							  		
							  		case 87 :  // Shift+W KEY == BOUNCE OPPOSITE
							  		removeShowing();
							  			$('.bounce-opposite').addClass('showing');
							  			$('.bounce-opposite').animate({'opacity':'1'}, 200);
							  			$('.bounce-opposite').find($('.cover')).animate({'opacity':'0.5'}, 500);
							  			$('.bounce-opposite').find($('.animated-ball')).animate({'left': '56px', 'top': '65px'}, 500, 'easeOutExpo');
							  			$('.bounce-opposite').find($('.empty-basket-b')).delay(350).animate({'opacity':'0'}, 100);
							  			$('.bounce-opposite').find($('.bounce-basket')).delay(250).animate({'opacity':'1'}, 50, 'easeOutExpo');
							  			$('.bounce-opposite').find($('.ex-point')).delay(300).animate({'opacity':'1', 'top': '55px'}, 500, 'easeOutCirc');
							  			$('.bounce-opposite').find($('.name')).delay(600).animate({'opacity':'1', 'margin-right':'55px'}, 400, 'easeOutExpo');
							  			$('.bounce-opposite').find($('.action')).delay(600).animate({'opacity':'1', 'margin-left':'158px'}, 400, 'easeOutExpo');
							  			
							  		break;
							  		
							  		case 101 :  // E KEY == toggle-right
							  		removeShowing();
							  			$('.block').addClass('showing');
							  			$('.block').animate({'opacity':'1'}, 200);
							  			$('.block').find($('.cover')).animate({'opacity':'0.5'}, 500);
							  			$('.block').find($('.animated-ball')).delay(150).animate({'left': '100px', 'top': '53px'}, 100).animate({'opacity':'0'},100);
							  			$('.block').find($('.empty-basket-b')).delay(350).animate({'opacity':'0'}, 100);
							  			$('.block').find($('.basketball-block-pre')).animate({'opacity':'1', 'left':'-18px'}, 200);
							  			$('.block').find($('.basketball-block')).delay(200).animate({'opacity':'1', 'top': '3px', 'left':'-12px'}, 100);
							  			$('.block').find($('.name, .action')).delay(600).animate({'opacity':'1', 'margin-left':'4px'}, 400, 'easeOutExpo');


							  		
							  		break;
							  		
							  		
							  		case 69 :  // Shift+E KEY == block opposite

							  		removeShowing();
							  			$('.block-opp').addClass('showing');
							  			$('.block-opp').animate({'opacity':'1'}, 200);
							  			$('.block-opp').find($('.cover')).animate({'opacity':'0.5'}, 500);
							  			$('.block-opp').find($('.animated-ball')).delay(150).animate({'left': '70px', 'top': '53px'}, 150).animate({'opacity':'0'},100);
							  			$('.block-opp').find($('.empty-basket-b')).delay(350).animate({'opacity':'0'}, 100);
							  			$('.block-opp').find($('.basketball-block-pre')).animate({'opacity':'1', 'left':'-32px'}, 200);
							  			$('.block-opp').find($('.basketball-block')).delay(250).animate({'opacity':'1', 'top': '3px', 'left':'-28px'}, 100);
							  			$('.block-opp').find($('.action')).delay(600).animate({'opacity':'1', 'margin-left':'175px'}, 400, 'easeOutExpo');
							  			$('.block-opp').find($('.name')).delay(600).animate({'opacity':'1', 'margin-right':'58px'}, 400, 'easeOutExpo');


							  		
							  		break;

							  		
							  		
							  		
							  		
							  		
							  		
							  		
							  		case 114 :  // R KEY == toggle-bottom
							  		
							  		
							  		
							  		break;
							  		case 116 :  // T KEY == toggle-left
							  		
							  		
							  		break;
							  		case 121 : // Y KEY == Ball
								  		
							  		
							  		
							  		break;
							  		case 117 : 
	
							  		
							  		break;
							  		case 120 :  // X KEY == CLOSE Any
							  		
										removeShowing();
										keyPressed = e.keyCode;
										
									break;
							
						  	}
						  	
						  	}
						  	
						  	function removeShowing() {
								if ($('.showing') != undefined){
									var oldShowing = $('.showing');
									oldShowing.removeClass('showing');
									oldShowing.animate({'opacity':'0'},0, function(){
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

