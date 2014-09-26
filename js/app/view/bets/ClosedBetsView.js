define([
    'marionette',
    'text!app/view/bets/ClosedBetsView.tpl.html'
],
function(Marionette,tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM',
        template: _.template(tpl),
        closedBets:[],

        events: {
            //Add Back Button Listener here.
            //'click #place-bet-button': 'onPlacebetClick'
        },

        /**
         * @param options
         */
        ready: function() {
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:closedBetsViewDataComplete", this.onClosedBets, this);
        },

        onClosedBets: function(bets) {
            this.closedBets = bets;
            this.$el.html(this.template({bets: bets}));
        },

        onShow: function() {
            this.$el.html(this.template({bets: this.closedBets}));
        }


    });
});