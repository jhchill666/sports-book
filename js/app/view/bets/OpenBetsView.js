define([
    'marionette',
    'text!app/view/bets/OpenBetsView.tpl.html'
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
            this.betsModel.on("bets:openViewDataComplete", this.onOpenBets, this);
        },

        onOpenBets: function(bets) {
            this.betConfirmations = bets;
            this.$el.html(this.template({bets: bets}));
        },

        onShow: function() {
            this.$el.html(this.template({bets: this.betConfirmations}));
        }


    });
});