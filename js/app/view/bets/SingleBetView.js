define([
    'marionette',
    'text!app/view/bets/SingleBetView.tpl.html'
],
function(Marionette, tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel,betSlipPM',
        template: _.template(tpl),
        singles: [],


        events: {
            'click .row .option a.remove': 'onRemoveSingle',
            'change .row label.stake input': 'onStakeChange',
            'keydown .row label.stake input': 'onKeyDown'
        },


        /**
         * @param options
         */
        ready: function() {
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:addSingleBet", this.addSingleBet, this);
            this.betsModel.on("bets:clearSingleBets", this.clearSingleBets, this);
            this.pm.on("bets:updateEstimatedReturns", this.updateEstimatedReturns, this);
        },


        /**
         *
         */
        onShow: function() {
            this.$el.html(this.template({bets: this.singles}));
        },

        onStakeChange: function(event) {
            var betId = $(event.currentTarget).closest('li').attr('id');
            var newStake = parseFloat($(event.currentTarget).val()).toFixed(2);
            $(event.currentTarget).val(newStake.toString());
            if (isNaN(newStake) || newStake == "") {
    		  newStake = 0.00;
            }
            this.pm.updateStake(betId, newStake);
        },

        onKeyDown: function(event) {
            var charCode = (event.which) ? event.which : event.keyCode;
            if(charCode <48 || charCode >58){
                //stop anything that isn't 13=enter  8=backspace, delete=46 ,  110 + 190=fullstop , 37 thru 40 arrow keys.
                if((charCode <96 || charCode>105) && charCode !=13 && charCode !=8  && charCode !=46 && charCode !=110 && charCode !=190 && charCode !=37 && charCode !=38 && charCode !=39 && charCode !=40){
                    event.preventDefault();
                }
            }
        },

        /**
         */
        onRemoveSingle: function(event) {
            var betId = $(event.currentTarget).closest('li').attr('id');
            var bet = _.find(this.singles, function(bet){
                return bet.betId() == betId;
            });

            this.betsModel.removeBetSelection(bet);
            this.removeSingleBet(bet);
            this.pm.updateTotalStake();
        },


        /**
         * @param newBet
         */
        addSingleBet: function(bet) {
            this.singles = this.singles.concat(bet);
            this.onShow();
            
            $('#bets-multiples').show();
            
        },

        clearSingleBets: function() {
            this.singles = [];
            this.onShow();
         },

        updateEstimatedReturns: function(bet) {
            var estimatedValue = bet.estimatedReturnsDisplayVal();
            var betId = bet.betId();
            $('#'+betId).find('.returns span').html(' ' + bet.estimatedReturnsDisplayVal());
        },

        /**
         * @param bet
         */
        removeSingleBet: function(bet) {
            this.singles = _.without(this.singles, bet);
            this.onShow();
        }
    });
});