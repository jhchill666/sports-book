define(['marionette',
    'ctx',
    'text!app/view/bets/BetSlipView.tpl.html'
],
function(Marionette, ctx, tpl) {

        return Marionette.LayoutView.extend({


            template: _.template(tpl),
            dependencies: 'betsModel, pm=betSlipPM, sessionModel',
            defaultBetSlipInView:true,

            events: {
                'click #bet-slip .tab-bar-betslip a#clear-bets-button': 'onClearBetsClick',
                'click #bet-slip .tab-bar-betslip a#tab-nav-open': 'onOpenBetsClick',
                'click #bet-slip .tab-bar-betslip a#tab-nav-closed': 'onClosedBetsClick',
                'click #bet-slip .tab-bar-betslip a#tab-nav-singles': 'onDefautBetsClick',
                'click #bet-slip .tab-bar-betslip a': 'onTabClick'
            },

            regions: {
                "singlesRegion": "#bets-singles",
                "multiplesRegion": "#bets-multiples",
                "confirmationRegion": "#bets-confirmation",
                "openBetsRegion": "#bets-open",
                "closedBetsRegion": "#bets-closed",
            },

            ready: function() {
                this.betsModel.on("bets:showConfirmationView", this.onShowConfirmationView, this);
                this.betsModel.on("bets:openViewDataComplete", this.onShowOpenBetsView, this);
                this.betsModel.on("bets:closedBetsViewDataComplete", this.onShowClosedBetsView, this);
                this.betsModel.on("bets:showDefaultBetView", this.onShowDefaultBetSlip, this);
                this.pm.on("onSessionLogin", this.onSessionLogin, this);
				this.pm.on("onSessionLogout", this.onSessionLogout, this);
            },
            
            onSessionLogin: function(){
				$('#tab-nav-open').show();
				$('#tab-nav-closed').show()
            },
            
            onSessionLogout: function(){
            	$('#tab-nav-open').hide();
	            $('#tab-nav-closed').hide();
	            this.showDefaultBetSlip();
            },

            onClearBetsClick: function(e) {
                this.pm.clearAllBetsClick();
                this.showDefaultBetSlip();
            },

            onOpenBetsClick: function(e) {
                this.pm.getOpenBetsClick();
            },

            onClosedBetsClick: function(e) {
                this.pm.getClosedBetsClick();
            },
            
            onDefautBetsClick: function(e) {
                this.showDefaultBetSlip();
            },

            onShowDefaultBetSlip: function() {
                if (this.defaultBetSlipInView) {
                    this.showDefaultBetSlip();
                    //this.betsModel.clearAllBets();
                }
            },
            
            onShowConfirmationView: function() {
                this.singlesRegion.$el.hide();
                this.openBetsRegion.$el.hide();
                this.multiplesRegion.$el.hide();
                this.closedBetsRegion.$el.hide();
                this.confirmationRegion.$el.show();
                this.defaultBetSlipInView = false;
            },

            onShowOpenBetsView: function() {
                this.singlesRegion.$el.hide();
                this.multiplesRegion.$el.hide();
                this.confirmationRegion.$el.hide();
                this.closedBetsRegion.$el.hide();
                this.openBetsRegion.$el.show();
                this.defaultBetSlipInView = false;
                this.selectTab('#tab-nav-open');
            },
            
            onShowClosedBetsView: function() {
                this.singlesRegion.$el.hide();
                this.multiplesRegion.$el.hide();
                this.confirmationRegion.$el.hide();
                this.openBetsRegion.$el.hide();
                this.closedBetsRegion.$el.show();
                this.defaultBetSlipInView = false;
                this.selectTab('#tab-nav-closed');
            },
            
            showDefaultBetSlip: function() {
                this.singlesRegion.$el.show();
                this.multiplesRegion.$el.show();
                this.openBetsRegion.$el.hide();
                this.confirmationRegion.$el.hide();
                this.closedBetsRegion.$el.hide();
                this.defaultBetSlipInView = true;
                this.selectTab('#tab-nav-singles');
            },
            
            selectTab : function(tabEl){

            	//Set Selected Tab
            	$('#bet-slip .tab-bar-betslip li.active').removeClass('active');
            	$(tabEl).parent().addClass('active');

            },


            /**
             *
             */
            onShow: function() {
                this.defaultBetSlipInView = true;

                this.singlesRegion.show(ctx.get('singleBetView'));
                this.multiplesRegion.show(ctx.get('multipleBetView'));
                
                this.openBetsRegion.show(ctx.get('openBetsView'));
                this.openBetsRegion.$el.hide();

                this.closedBetsRegion.show(ctx.get('closedBetsView'));
                this.closedBetsRegion.$el.hide();
                
                this.confirmationRegion.show(ctx.get('confirmationBetView'));
                this.confirmationRegion.$el.hide();
                
                //Hide open closed bets if not logged in.
                if (!this.sessionModel.isLoggedIn()) {
	                $('#tab-nav-open').hide();
					$('#tab-nav-closed').hide();
	            }
                
            }
    });
});