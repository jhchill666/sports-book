var BetJsonGenerator = (function() {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        var multipleNames = {
            'DOUBLE': 'SYSTEM_2',
            'TREBLE': 'SYSTEM_3',
            'FOURFOLD': 'SYSTEM_4',
            'FIVEFOLD': 'SYSTEM_5',
            'SIXFOLD': 'SYSTEM_6',
            'SEVENFOLD': 'SYSTEM_7',
            'EIGHTFOLD': 'SYSTEM_8',
            'NINEFOLD': 'SYSTEM_9'
        };

        var betToJson = function(betParts, betTime, stake, type, bet) {
            var betObject = {};
            var betPartArray = [];

            for (var j = 0; j < betParts.length; j++) {
                var betPartObject = {};
                betPartObject.partNo = betParts[j].partNo;
                betPartObject.selectionId = betParts[j].selection.selectionId;
                if (bet.useSP) {
                    betPartObject.odds = {priceType: 'STARTING'};
                } else {
                    betPartObject.odds = {decimal: betParts[j].selection.decimalOdds};
                }

                if (bet.line !== undefined)
                {
                    betPartObject.line = bet.line;
                }

                betPartArray.push(betPartObject);
            }

            betObject.stake = {amount: stake, currency: 'GBP'};
            betObject.parts = {betPart: betPartArray};
            if (bet.betTime) {
                betObject.betTime = bet.betTime;
            } else {
                betObject.betTime = betTime;
            }
            if (bet.id) {
                betObject.id = bet.id;
            }
            betObject.type = type;
            if (bet.eachWay) {
                betObject.winType = 'EACH_WAY';
            } else {
                betObject.winType = 'WIN';
            }

            return betObject;
        };

        /**
         * example: 
         * accountId = 1;
         * singleBets = ['bet-1' : Bet object, 'bet-2' : Bet object]; refer Bet.js
         * systemBets = ['bet-DOUBLE' : SystemBet object, 'bet-TREBLE' : SystemBet object]; refer SystemBet.js
         */
        var generateJson = function(accountId, singleBets, systemBets, forecastBets, isCashout) {

            var betTime = new Date().getTime();
            var betArray = [];

            for (var key in singleBets) {
                var bet = singleBets[key];
                if (bet.stake && parseFloat(bet.stake) > 0)
                {
                    betArray.push(betToJson([bet.betPart], betTime, bet.stake, 'SINGLE', bet));
                }
            }

            //allBetParts will be required for full cover bets, example: TRIXIE
            var allBetParts = [];
            var index = 1;
            for (var key in singleBets) {
                var betPartClone = singleBets[key].betPart.clone();
                betPartClone.partNo = index++;
                allBetParts.push(betPartClone);
            }

            for (var key in systemBets) {
                var systemBet = systemBets[key];

                if (systemBet.stake && parseFloat(systemBet.stake) > 0) {

                    var betName = systemBet.name;

                    if (!systemBet.fullCover) {
                        if (systemBet.bets.length == 1) {
                            betName = 'MULTIPLE';
                        } else {
                            betName = multipleNames[systemBet.name];
                            if (!betName) {
                                betName = systemBet.name.replace('ACCUMULATOR', 'SYSTEM_');
                            }
                        }
                    }

                    betArray.push(betToJson(allBetParts, betTime, systemBet.stake, betName, systemBet));
                }

            }

            for (var key in forecastBets) {
                var forecastBet = forecastBets[key];

                if (forecastBet.headerKey) {//header
                    continue;
                }

                if (forecastBet.stake && parseFloat(forecastBet.stake) > 0) {
                    var forecastHeader = forecastBet.forecastHeader;
                    betArray.push(betToJson(forecastHeader.betParts, betTime, forecastBet.stake, forecastBet.name, forecastBet));
                }

            }

            if (betArray.length == 0) {
                return null;
            }

            var betObj;

            if (isCashout)
            {
                betObj = {'CalculateCashoutRequest':
                            {'accountId': accountId,
                                'bets': {bet: betArray},
                                'channelId': 6}
                };
            }
            else
            {
                betObj = {'PlaceBetsRequest':
                            {'accountId': accountId,
                                'bets': {bet: betArray},
                                'channelId': 6}
                };
            }

            //console.log('placing bet ::  '+JSON.stringify(betObj));
            //return null;
            return JSON.stringify(betObj);
        };

        return {
            generateJson: generateJson
        };
    }
    ;

    return {
        getInstance: function() {

            if (!instance) {
                instance = init();
            }

            return instance;
        }

    };

})();