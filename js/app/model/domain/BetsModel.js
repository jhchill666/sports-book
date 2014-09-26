define(function (require) {

    var Marionette = require('marionette');
    var BetSelection = require('betSelection');
    var BetTypeCalculator = require('betTypeCalculator');
    var BetJsonGenerator = require('betJsonGenerator');
    var BetsSummary = require('betsSummary');
    var BetPart = require('betPart');
    var SingleBet = require('singleBet');
    var SystemBet = require('systemBet');
    var Bet = require('bet');

   return Marionette.Controller.extend({

        dependencies: 'socket=socketService, eventCache, eventDetailsModel, commands, vent, oddsFactory,sessionModel',
        
        acceptedBetsCollection:[],
        rejectedBetsCollection:[],
        openBetsCollection:[],

        betConfirmationResult:[],
        betSelectionsDictionary:[],
        selectionCount:0,
        singleBets:[],
        singleBetCount:0,
        systemBets:[],
        systemBetCount:0,
        forecastBets:[],
        forecastBetCount:0,
        
        
        betTypeCalculator: BetTypeCalculator.getInstance(),
        betJsonGenerator: BetJsonGenerator.getInstance(),
        openBets: BetsSummary,

//        initialize: function( options ) {
//            this.betTypeCalculator = BetTypeCalculator.getInstance();
//            this.betJsonGenerator = BetJsonGenerator.getInstance();
//        },

        ready: function(options) {
            _.bindAll(this,'onSelectionClick');
            this.vent.bind('selection:click', this.onSelectionClick);
        },

        addSelection: function(betSelection) {
            var selId = 'sel-' + betSelection.selectionId;
            if (this.betSelectionsDictionary.hasOwnProperty(selId)) {
                return null;
            } 
            
            this.betSelectionsDictionary[selId] = betSelection;
            this.selectionCount++;   
            
            var newBetPart = new BetPart(betSelection, 1);
            var newBet = new SingleBet(newBetPart, '');
            
            this.singleBets[newBet.betId()] = newBet;
            this.singleBetCount++;

            this.updateSystemBets();

            return newBet;
            
        },

        buildBetSelection: function(selectionObj) {
            var eventId = selectionObj.eventId;
            var selectionId = selectionObj.selectionId;
            var event;
            
//            if (selectionObj.hasOwnProperty('event')) {
//                event = selectionObj.event;
//            }
//            else {
//                event = this.eventScheduleModel.findEventById(eventId);
//            }

            event = this.eventCache.getEvent(eventId);

            if (_.isUndefined(event)) return;

            var eventName = event.attributes.name;
            var selectionid = parseInt(selectionId);
            var selection = event.findSelection(selectionid);
            if (_.isUndefined(selection)) return;

            var selectionName = selection.attributes.name;
            var rootIdx = selection.attributes.rootIdx;
            var marketId = selection.attributes.marketId;
            var market = event.findMarket(marketId);
            var marketName = market.attributes.name;
            var marketState = market.attributes.state;
            
            var decimalOdds;
            var fractionalOdds;
            
            var oddsObj = this.oddsFactory.getOddsByIndex(rootIdx);
            if (oddsObj) {
                decimalOdds = oddsObj.decimal;
                fractionalOdds = oddsObj.fractional;   
            }
            else {
                fractionalOdds = selection.attributes.fractionalOdds;
                decimalOdds = selection.attributes.decimalOdds;
            }
            
            var betSelection = new BetSelection(eventId,eventName,marketId,
                                        marketName,marketState,selectionid,selectionName,fractionalOdds,decimalOdds);
             
            var newBet = this.addSelection(betSelection);
            if (newBet) {
                this.trigger("bets:addSingleBet", newBet);   
            }
            this.trigger("bets:showDefaultBetView");
            
            this.updateMultiples();
            
        },

        clearAllBets: function() {
            this.betSelectionsDictionary = [];
            this.singleBets = [];
            this.systemBets = [];
            this.singleBetCount = 0;
            this.selectionCount = 0;
            
            this.trigger("bets:clearSingleBets");
            this.updateSystemBets();
            this.updateMultiples();
        },

        getOpenBets: function() {
            this.commands.execute('command:getOpenBets');
        },

        getClosedBets: function() {
            var today = new Date();
            today.setDate(today.getDate() + 1);

            var fromDate = new Date();
            fromDate.setDate(today.getDate() - 30);

            var fromDay = ('0' + (fromDate.getDate())).slice(-2);
            var toDay = ('0' + (today.getDate())).slice(-2);

            var fromMonth = ('0' + (fromDate.getMonth() + 1)).slice(-2);
            var toMonth = ('0' + (today.getMonth() + 1)).slice(-2);

            var fromDate = fromDate.getFullYear() + '-' + fromMonth + '-' + fromDay + "T00:00:00";
            var toDate = today.getFullYear() + '-' + toMonth + '-' + toDay + "T00:00:00";
            
            this.commands.execute('command:getClosedBets',fromDate,toDate);
        },

        removeBetSelection: function(bet) {
            var betId = bet.betId();
            delete this.singleBets[betId];
            var selId = betId.replace('bet','sel');
            
            if (_.has(this.betSelectionsDictionary, selId)) {
                delete this.betSelectionsDictionary[selId];
            }
            
            this.singleBetCount --;
            this.selectionCount--;

            this.updateSystemBets();
            this.updateMultiples();
        },

        updateMultiples: function() {
            var systemBets = this.getSystemBets();
            this.trigger("bets:addMultipleBet", systemBets);
        },
        
        updateStake: function(betId, newStake) {
            var bet = this.getBet(betId);
            if (bet) {
                bet.stake = newStake;
            }
            return bet;
        },

        totalStake: function() {
            return this.betTypeCalculator.totalStake(this.singleBets, this.systemBets, this.forecastBets);
        },
        
        estimatedReturns: function() {
            return this.betTypeCalculator.estimatedReturns(this.singleBets, this.systemBets);
        },
        
        estimatedReturnsDisplayVal: function() {
            var returns = this.estimatedReturns();
            if (isNaN(returns)) {
                return '0';
            }
            return returns.toFixed(2);
        },

        getBet: function(betId) {
            var singleBet = this.singleBets[betId];
            if (singleBet) {
                return singleBet;
            }
            var systemBet = this.systemBets[betId];
            if (systemBet) {
                return systemBet;
            }
            var forecastBet = this.forecastBets[betId];
            if (forecastBet) {
                return forecastBet;
            }
            return null;
        },

        getSystemBets: function() {
            var bets = [];
            for (var key in this.systemBets) {
                bets.push(this.systemBets[key]);
            }
            return bets;
        },

        updateSystemBets: function() {
            var newSystemBets = this.betTypeCalculator.calculateSystemBets(this.singleBets);
            var newSystemBetsCount = 0;
            for (var key in newSystemBets) {
                var existingSystemBet = this.systemBets[key];
                if (existingSystemBet != null) {
                    newSystemBets[key].stake = existingSystemBet.stake;
                }
                newSystemBetsCount++;
            }

            this.systemBets = newSystemBets;
            this.systemBetCount = newSystemBetsCount;


            var newForecastBets = this.betTypeCalculator.calculateForecastBets(this.singleBets);
            var newForecastBetsCount = 0;
            for (var key in newForecastBets) {
                var existingForecastBet = this.forecastBets[key];
                if (existingForecastBet != null) {
                    newForecastBets[key].stake = existingForecastBet.stake;
                }
                newForecastBetsCount++;
            }

            this.forecastBets = newForecastBets;
            this.forecastBetCount = newForecastBetsCount;
        },

        onSelectionClick: function(selectionObj) {
            this.buildBetSelection(selectionObj);
        },
        
        placeBet: function() {
            this.acceptedBetsCollection = [];
            this.rejectedBetsCollection = [];
            
            var isCashout = false;
            var betJson = this.betJsonGenerator.generateJson(this.sessionModel.getAccountId(), 
                                this.singleBets, this.systemBets, this.forecastBets, isCashout);
            
            this.commands.execute('command:placeBets', betJson )
                        .done(this.onBetPlacementSuccess)
                        .fail(this.onBetPlacementFailure);
        },
        
        setRejectedBetResults: function(betResult) {
            var status = betResult.status;
            var betSelections = betResult.betPartPlacementResult;
            
            for (var i = 0; i < betSelections.length; i++) {
                var bet = betSelections[i];
                var betSelection = 'bet-' + bet.selectionId;
                var singleBet = this.singleBets[betSelection];
                singleBet.betPlacedRef = betResult.betId;
                this.acceptedBetsCollection.push(singleBet);                
            }            
            //FIXME ONLY RENDER WHEN ALL BETS HAVE BEEN BUILT.
            
            this.trigger("bets:addRejections", this.rejectedBetsCollection);
            this.trigger("bets:showConfirmationView");
        },
        
        setAcceptedBetResult: function(betResult) {
            //status ACCEPTED or OVER_ASK
            var status = betResult.status;
            var betSelections = betResult.betPartPlacementResult;
            
            for (var i = 0; i < betSelections.length; i++) {
                var bet = betSelections[i];
                var betSelection = 'bet-' + bet.selectionId;
                var singleBet = this.singleBets[betSelection];
                singleBet.betPlacedRef = betResult.betId;
                this.acceptedBetsCollection.push(singleBet);                
            }            
            //FIXME ONLY RENDER WHEN ALL BETS HAVE BEEN BUILT.
            this.trigger("bets:addConfirmations", this.acceptedBetsCollection);
            this.trigger("bets:showConfirmationView");
        },

        setClosedBetsResult: function(closedBetsResult) {
            var closedBets = closedBetsResult;
            this.trigger("bets:closedBetsViewDataComplete",closedBets);
        },

        setOpenBetsResult: function(openBetsReceived) {
            var openBets = openBetsReceived;
            this.trigger("bets:openViewDataComplete",openBets);
        },
        
        onBetPlacementSuccess: function(data, textStatus, jqXHR) {
            //Switch views here.
        },
        
        onBetPlacementFailure: function(data, textStatus, jqXHR) {
            //Switch to Errors BetSlip view here.
        }


    });
});

