var BetTypeCalculator = (function() {

	// Instance stores a reference to the Singleton
	var instance;

	function init() {
		
		var multipleNames = {
				'2' : 'DOUBLE',
				'3' : 'TREBLE',
				'4' : 'FOURFOLD',
				'5' : 'FIVEFOLD',
				'6' : 'SIXFOLD',
				'7' : 'SEVENFOLD',
				'8' : 'EIGHTFOLD',
				'9' : 'NINEFOLD'
		};
		
		var fullCoverNames = {
				'3' : 'TRIXIE',
				'4' : 'YANKEE',
				'5' : 'CANADIAN',
				'6' : 'HEINZ',
				'7' : 'SUPER_HEINZ',
				'8' : 'GOLIATH',
				'9' : 'SUPER_GOLIATH'
		};
		
		var fullCoverWithSinglesNames = {
				'3' : 'PATENT',
				'4' : 'LUCKY_15',
				'5' : 'LUCKY_31',
				'6' : 'LUCKY_63'
		};
		
		var multipleNamesAliases = {
				'SYSTEM_2'  : 'DOUBLE',
				'SYSTEM_3'  : 'TREBLE',
				'SYSTEM_4'  : 'FOURFOLD',
				'SYSTEM_5'  : 'FIVEFOLD',
				'SYSTEM_6'  : 'SIXFOLD',
				'SYSTEM_7'  : 'SEVENFOLD',
				'SYSTEM_8'  : 'EIGHTFOLD',
				'SYSTEM_9'  : 'NINEFOLD',
		};
		
		var defaultStake = '';

		//private members
		var marketRepeated = function(selections) {
			var marketIds = [];
			for (var key in selections) {
				if (marketIds.indexOf(selections[key].marketId) >= 0 ) {
					return true;
				}
				marketIds.push(selections[key].marketId);
			}
			return false;
		};
		
		var uniqueMarketsCount = function(selections) {
			var marketIds = [];
			for (var key in selections) {
				if (marketIds.indexOf(selections[key].marketId) < 0 ) {
					marketIds.push(selections[key].marketId);
				}
			}
			return marketIds.length;
		};
		
		var combinations = function(numArr, choose, callback) {
		    var n = numArr.length;
		    var c = new Array();
		    var inner = function(start, choose_) {
		        if (choose_ == 0) {
		            callback(c);
		        } else {
		            for (var i = start; i <= n - choose_; ++i) {
		                c.push(numArr[i]);
		                inner(i + 1, choose_ - 1);
		                c.pop();
		            }
		        }
		    };
		    inner(0, choose);
		};
		
		//if there are 5 selections, this will give [0, 1, 2, 3, 4]
		var createNumericArray = function(selections) {
			var numericArray = [];
			for (var i = 0; i < selections.length; i++) {
				numericArray.push(i);
			}
			return numericArray;
		};
		
		var createSelectionIndexCombinations = function(numMarkets, numericArray) {
			var combinationArrays = {};
			
			for (var i = 0; i <= numMarkets; i++) {
				combinationArrays[i] = new Array();
			}
			
			for (var i = 2; i <= numMarkets; i++) {
				combinations(numericArray, i,
				    function output(arr) {
						//problems with pushing array, so converting them to string and storing
				        var s = '';
				        for (var j = 0; j < arr.length; j++) {
				        	s = s + '|' + arr[j];
				        }
						combinationArrays[i].push(s.substr(1));
				    }
				);
			}
			return combinationArrays;
		};
		
		var createMultipleBet = function(betSelections, multipleName) {
			var bet = new Bet([], defaultStake, multipleName);
			for (var i = 0; i < betSelections.length; i++) {
				bet.parts.push(new BetPart(betSelections[i], i+1));
			}
			return bet;
		};
		
		var createFullCoverBet = function(allSelections, multipleBets, betName) {
			var fullCoverBets = new Array();
			for (var i = 0; i < allSelections.length; i++) {
				fullCoverBets.push(new Bet([new BetPart(allSelections[i], 1)], defaultStake, betName));
			}
			for (var key in multipleBets) {
				var bets = multipleBets[key].bets;
				for (var i = 0; i < bets.length; i++) {
					fullCoverBets.push(bets[i].clone());
				}
			}
			var systemBet = new SystemBet(fullCoverBets, defaultStake, betName);
			systemBet.fullCover = true;
			
			return systemBet;
		};	
		
		var calculateSystemBets = function(singleBets) {
			
			var selections = new Array();
			for (var key in singleBets) {
				if (singleBets[key].includeInMultiples) {
					selections.push(singleBets[key].betPart.selection);
				}
			}
			
			var numMarkets = uniqueMarketsCount(selections);
			if (numMarkets < 2) {
				return [];
			}
			
			//if there are 3 selections (markets different), it will create [0,1], [0,2], [1,2], [0,1,2]
			var combinationArrays = createSelectionIndexCombinations(numMarkets, createNumericArray(selections));
			
			var checkForMarketRepitition = marketRepeated(selections);
			var multipleBets = new Array();
			
			for (var i = 2; i <= numMarkets; i++) {
				for (var j = 0; j < combinationArrays[i].length; j++) {
					var selectionIndexes = combinationArrays[i][j].split('|');
					var betSelections = new Array();
					for (var k = 0; k < selectionIndexes.length; k++) {
						betSelections.push(selections[selectionIndexes[k]]);
					}
					if (checkForMarketRepitition && marketRepeated(betSelections)) {
						continue;
					}
					
					var multipleName = multipleNames[i + ''];
					if (multipleName == null) {
						multipleName = 'ACCUMULATOR' + i;
					}
					
					if (!multipleBets.hasOwnProperty(multipleName)) {
						multipleBets[multipleName] = new SystemBet([], defaultStake, multipleName);
					}
					
					multipleBets[multipleName].bets.push(createMultipleBet(betSelections, multipleName));
				}
			}
			
			var fullCoverSystemBets = new Array();
			if (!marketRepeated(selections)) {//full covers are available only when markets are unique

				var fullCoverName = fullCoverNames[numMarkets + ''];
				if (fullCoverName != null) {
					fullCoverSystemBets[fullCoverName] = createFullCoverBet([], multipleBets, fullCoverName);
				}
				
				var fullCoverWithSinglesName = fullCoverWithSinglesNames[numMarkets + ''];
				if (fullCoverWithSinglesName != null) {
					fullCoverSystemBets[fullCoverWithSinglesName] = createFullCoverBet(selections, multipleBets, fullCoverWithSinglesName);
				}
			}
			
			var systemBets = new Array();
			for (var key in multipleBets) {
				systemBets[key] = multipleBets[key];
			}
			for (var key in fullCoverSystemBets) {
				systemBets[key] = fullCoverSystemBets[key];
			}
			
			return systemBets;
			
		};
		
		var totalStake = function(singleBets, systemBets, forecastBets) {
	    	var stake = 0.0;
	    	for (var key in singleBets) {
	    		stake = stake + singleBets[key].totalStake();
			}
	    	for (var key in systemBets) {
	    		stake = stake + systemBets[key].totalStake();
			}
	    	for (var key in forecastBets) 
	    	{
	    		var forcastBet = forecastBets[key];
	    		if ( forcastBet instanceof ForecastBet )
	    		{
	    			stake = stake + forecastBets[key].totalStake();	
	    		}
			}
	    	return stake;
		};
		
		var estimatedReturns = function(singleBets, systemBets, forecastBets) {
	    	var returns = 0.0;
	    	
	    	var bestSingles = new Array();
	    	
	    	for (var key in singleBets) {
	    		var bet = singleBets[key];
				var mktIdString = bet.marketIdsString();
				
				if (bestSingles[mktIdString] == null
						|| bestSingles[mktIdString] < bet.estimatedReturns()) {
					bestSingles[mktIdString] = bet.estimatedReturns();
				}
	    	}
	    	
	    	for (var key in bestSingles) {
	    		returns = returns + parseFloat(bestSingles[key]);
	    	}
	    	
	    	for (var key in systemBets) {
	    		returns = returns + systemBets[key].estimatedReturns();
			}
	    	return returns;
		};
		
		var segragateIntoMarketGroups = function(selections) {
			var selectionGroups = new Array();
			
			for (var i = 0; i < selections.length; i++) {
				var selection = selections[i];
				var marketId  = 'mkt-' + selection.marketId;
				if (!selectionGroups.hasOwnProperty(marketId)) {
					selectionGroups[marketId] = new Array();
				}
				selectionGroups[marketId].push(selection);
			}
			
			return selectionGroups;
		};
		
		var reverseForecastBet = function(forecastBets,forecastHeaderKey,isReverse) {
			
	    	for (var i = 0; i < forecastBets.length; i++)
	    	{
	    		var forecastObj = forecastBets[i];
	    		if ( forecastObj instanceof ForecastBet )
	    		{
	    			if ( forecastObj.forecastHeader )
	    			{
	    				if ( forecastObj.forecastHeader.headerKey == forecastHeaderKey )
	    				{
	    					var betTypeName;
	    					if ( forecastObj.name == 'STRAIGHT_FORECAST' || forecastObj.name == 'REVERSE_FORECAST' )
	    					{
	    						betTypeName = isReverse ? 'REVERSE_FORECAST' : 'STRAIGHT_FORECAST';
	    						forecastObj.name = betTypeName; 
	    						forecastObj.numBets = isReverse ? 2 : 1;
	    					}
	    					else if ( forecastObj.name == 'TRICAST' || forecastObj.name == 'REVERSE_TRICAST' )
	    					{
	    						betTypeName = isReverse ? 'REVERSE_TRICAST' : 'TRICAST';
	    						forecastObj.name = betTypeName;
	    						forecastObj.numBets = isReverse ? 2 : 1;
	    					}
	    				}
	    			}
	    		}
	    	}
	    };
		
		
		var calculateForecastBets = function(singleBets) {
			
			var forecastBets = new Array();

			var selections = new Array();
			for (var key in singleBets) {
				var singleBet = singleBets[key];
				if (singleBet.includeInMultiples && singleBet.isRacing) {
					if ( singleBet.isForecastAvailable || singleBet.isTricastAvailable )
					{
						selections.push(singleBet.betPart.selection);	
					}
				}
			}
			
			var selectionGroups = segragateIntoMarketGroups(selections);
			
			for (var key in selectionGroups) {
				var selectionGroup = selectionGroups[key];
				if (selectionGroup.length == 1) {
					continue;
				}
				
				//add forecast header
				var forecastHeader = new ForecastHeader(key.replace('mkt-', ''), selectionGroup, '');
				forecastBets[forecastHeader.headerKey] = (forecastHeader);
				
				if (selectionGroup.length == 2) {
					var strForecast = new ForecastBet(forecastHeader, 1, defaultStake, 'STRAIGHT_FORECAST');
					forecastBets[strForecast.betId()] = strForecast;
				}
				
				if (selectionGroup.length > 2) {
					var numBets = selectionGroup.length * (selectionGroup.length - 1);
					var combiForecast = new ForecastBet(forecastHeader, numBets, defaultStake, 'COMBINATION_FORECAST');
					forecastBets[combiForecast.betId()] = combiForecast;
				}
				
				if (selectionGroup.length == 3) {
					var tricast = new ForecastBet(forecastHeader, 1, defaultStake, 'TRICAST');
					forecastBets[tricast.betId()] = tricast;					
				}
				
				if (selectionGroup.length > 3) {
					var numBets = selectionGroup.length * (selectionGroup.length - 1) * (selectionGroup.length - 2);
					var combiTricast = new ForecastBet(forecastHeader, numBets, defaultStake, 'COMBINATION_TRICAST');
					forecastBets[combiTricast.betId()] = combiTricast;
				}
			}
			
			return forecastBets;
			
		};
		
		var dummyForecasts = function(singleBets) {
            var selections = new Array();
			
			selections['sel-' + 1]  = new Selection('1',  'mkt-1', '1',  'sel-1', '11/10', '2.10'); selections['sel-' + 1].isRacing = true;
			selections['sel-' + 2]  = new Selection('1',  'mkt-1', '2',  'sel-2', '5/4',   '2.25'); selections['sel-' + 2].isRacing = true;
			
			var singleBets = [];
			for (var key in selections) {
				var bet = new SingleBet(new BetPart(selections[key], 1), 1.0);
				bet.isRacing = selections[key].isRacing;
				singleBets['bet-' + selections[key].selectionId] = bet;
			}
			
			return calculateForecastBets(singleBets);
		};
		
		var locateMultiple = function(probableMultiples, multipleName, uniqueMarketsCount) {
			//rename multiple type
			if (multipleName == 'MULTIPLE') {
				multipleName = 'SYSTEM_' + uniqueMarketsCount;
			}
			
			if (multipleName.indexOf('SYSTEM_') == 0) {
				if (multipleNamesAliases[multipleName] != null) {
					multipleName = multipleNamesAliases[multipleName];
				}
				else {
					multipleName = 'ACCUMULATOR' + multipleName.replace('SYSTEM_', '');
				}
			}
			
			for (var i in probableMultiples) {
				if (probableMultiples[i].name == multipleName) {
					return probableMultiples[i];
				}
			}
		};
		
		/**
		 * server results may not match with the json that we send.
		 * 
		 */
		var jsonToBets = function(openBets) {
			console.log(JSON.stringify(openBets));
            var singleBets = [];
			
			for (var i in openBets) {
				var openbet = openBets[i];
				if (openbet.betStatus == 'REJECTED') {
					continue;
				}
				if (openbet.type == 'SINGLE') {
					var betPart = openbet.parts.betPart[0];
					
					var selection = new Selection(betPart.market.id, betPart.market.name,
							betPart.selection.id, betPart.selection.name,
							null, betPart.odds.decimal, betPart.event.name);
			    	
					var singleBet = new SingleBet(new BetPart(selection, 1), openbet.stake.amount);
					singleBet.id = openbet.id;
					singleBet.betTime = openbet.betTime;
					
			    	singleBets.push(singleBet);
				}
			}
			
			//multiples may have selections that are not in singlebets
			var systemBets = [];
			
			for (var i in openBets) {
				var openbet = openBets[i];
				if (openbet.betStatus == 'REJECTED') {
					continue;
				}
				if (openbet.type != 'SINGLE') {
					var probableSingles = [];
					var selections = [];
					
					for (var j in openbet.parts.betPart) {
						var betPart = openbet.parts.betPart[j];
						
						var selection = new Selection(betPart.market.id, betPart.market.name,
								betPart.selection.id, betPart.selection.name,
								'', betPart.odds.decimal, betPart.event.name);
						
						selections.push(selection);
						probableSingles.push(new SingleBet(new BetPart(selection, 1), 0));
					}
					
					var probableMultiples = calculateSystemBets(probableSingles);
					if (count(probableMultiples) > 0) {
						var requiredMultiple = locateMultiple(probableMultiples, openbet.type, uniqueMarketsCount(selections));
						
						if (requiredMultiple != null) {
							requiredMultiple.stake = openbet.stake.amount;
							requiredMultiple.betTime = openbet.betTime;
							requiredMultiple.id = openbet.id;
							
							systemBets.push(requiredMultiple);
						}
					}
				}
			}
			
			return new BetsSummary(singleBets, systemBets, []);
		};

		//dont know why bets.length not working
		var count = function(bets) {
			var c = 0;
			for (var key in bets) {
				c++;
			}
			return c;
		};
		
		//public methods go in the following return block
		return {
			calculateSystemBets   : calculateSystemBets,
			calculateForecastBets : calculateForecastBets,
			reverseForecastBet :reverseForecastBet,
			//calculateForecastBets : dummyForecasts,
			estimatedReturns      : estimatedReturns,
			totalStake            : totalStake,
			jsonToBets            : jsonToBets
		};

	};

	return {

		getInstance : function() {

			if (!instance) {
				instance = init();
			}

			return instance;
		}

	};

})();