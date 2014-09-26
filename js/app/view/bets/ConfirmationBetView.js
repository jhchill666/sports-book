define([
    'marionette',
    'text!app/view/bets/ConfirmationBetView.tpl.html'
],
function(Marionette,tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM',
        template: _.template(tpl),
        betConfirmations:[],

        events: {
            //Add Back Button Listener here.
            //'click #place-bet-button': 'onPlacebetClick'
        },

        /**
         * @param options
         */
        ready: function() {
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:addConfirmations", this.addBetConfirmations, this);
        },

        addBetConfirmations: function(bets) {
            this.betConfirmations = bets;
            this.onShow();
        },

        onShow: function() {
            this.$el.html(this.template({bets: this.betConfirmations}));
        }


    });
});