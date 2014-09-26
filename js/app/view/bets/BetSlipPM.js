define(function (require) {

    var Marionette = require('marionette');
    var BetSelection = require('betSelection');
    var BetTypeCalculator = require('betTypeCalculator');
    var BetJsonGenerator = require('betJsonGenerator');
    var BetsSummary = require('betsSummary');
    var BetPart = require('betPart');
    var SingleBet = require('singleBet');

   return Marionette.Controller.extend({
        dependencies: 'betsModel, vent, sessionModel',

        placeBetButtonText:"Sign In & Place Bet",
       /**
        * @param options
        */
        ready: function(options) {
            _.bindAll(this,'onLogin', 'onLogout');
            
            this.vent.bind('session:loggedin', this.onLogin);
            this.vent.bind('session:loggedout', this.onLogout);
        },
        
        onLogin: function() {
        	
            this.trigger("onSessionLogin");
        },
        
        onLogout: function() {
            this.trigger("onSessionLogout");
        },

        clearAllBetsClick: function() {
            //FIXME ADD VALIDATION AND ARE YOU SURE HERE.
            this.betsModel.clearAllBets();
        },

        getOpenBetsClick: function() {
            //FIXME ADD VALIDATION IS USER LOGGED IN
            this.betsModel.getOpenBets();
        },

        getClosedBetsClick: function() {
            //FIXME ADD VALIDATION IS USER LOGGED IN
            this.betsModel.getClosedBets();
        },

        onPlaceBetClick: function() {
            if (this.sessionModel.isLoggedIn()) {
                this.validateBetSelection();
            }
            else {
                this.requestUserLogin();
            }
        },

        updateStake: function(betId, stake) {
            var bet = this.betsModel.updateStake(betId, stake);
            this.trigger("bets:updateEstimatedReturns",bet);
            this.updateTotalStake();
        },

        updateTotalStake: function() {
            this.trigger("bets:updateTotalStake");
        },

        requestUserLogin: function() {
            this.vent.trigger('session:requestLogin');
        },
        
        validateBetSelection: function() {
            if (this.betsModel.selectionCount == 0) {
                alert('No Bets Selected');
            }
            else {
                this.betsModel.placeBet();
            }
        },
        

       /**
        * @param newBet
        */
        onAddSingleBets: function(newBet) {
            this.trigger("addSingleBet", newBet);
        },


       /**
        * @param newBet
        */
        onAddMultipleBets: function(newBet) {
           this.trigger("addMultipleBet", newBet);
        },
        
        getBetButtonText: function() {
            return this.placeBetButtonText;
        },
        
        setBetButtonText: function(value) {
            this.placeBetButtonText = value;
        }
    });
});