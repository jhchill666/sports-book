define([
    'marionette',
    'text!app/view/bets/MultipleBetView.tpl.html'
],
function(Marionette,tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM',
        template: _.template(tpl),
        multiples: [],
        systemBet: null,

        events: {
            'click #place-bet-button': 'onPlacebetClick'
        },

        /**
         * @param options
         */
        ready: function() {
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:addMultipleBet", this.addMultipleBet, this);
            this.pm.on("onSessionLogin", this.onSessionLogin, this);
            this.pm.on("onSessionLogout", this.onSessionLogout, this);
            this.pm.on("bets:updateTotalStake", this.updateTotalStake, this);
        },

        onPlacebetClick : function(event) {
            this.pm.onPlaceBetClick();
        },

        /**
         *
         */
        onShow: function() {
            this.$el.html(this.template({bets: this.multiples}));
            var betButtonText = this.pm.getBetButtonText();
            $("#place-bet-button").val(betButtonText);
        },

        updateTotalStake: function() {
            var totalStake = this.betsModel.totalStake();
            if (isNaN(totalStake)) {
                totalStake = '0.00';
            }
            $('.bet-total-stake').find('em').html('£' + totalStake.toFixed(2));
        },

        /**
         * @param newBet
         */
        addMultipleBet: function(bet) {
            this.multiples = bet;
            this.onShow();
        },
        
        
        onSessionLogin: function() {
            this.pm.setBetButtonText("Place Bet");
            $("#place-bet-button").val("Place Bet");
        },
        
        onSessionLogout: function() {
            this.pm.setBetButtonText("Sign In & Place Bet");
            $("#place-bet-button").val("Sign In & Place Bet");
        }
    });
});