define([
    'marionette',
    'text!app/view/bets/RejectedBetView.tpl.html'
],
function(Marionette,tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM',
        template: _.template(tpl),
        betRejections:[],

        events: {
            //Add Back Button Listener here.
            //'click #place-bet-button': 'onPlacebetClick'
        },

        /**
         * @param options
         */
        ready: function() {
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:addRejections", this.addBetRejections, this);
        },

        addBetRejections: function(bets) {
            this.betRejections = bets;
            this.onShow();
        },

        onShow: function() {
            this.$el.html(this.template({bets: this.betRejections}));
        }


    });
});