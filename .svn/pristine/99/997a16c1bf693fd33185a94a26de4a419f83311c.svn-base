/**
 * example:
 * betPart = BetPart object; refer BetPart.js
 * stake = 1
 */
function SingleBet(betPart, stake) {
	
	this.betPart = betPart;
	this.stake   = stake;
	this.type    = 'SINGLE';

	this.includeInMultiples  = true;
	
	this.isRacing = false;
	
	this.isSPAvailable = false;
	this.useSP = false;
	
	this.isEachWayAvailable = false;
	this.eachWay  = false;
	this.eachWayOddsAPlace = 0.0;
	
	this.isForecastAvailable = false;
	this.isTricastAvailable = false;
	
	//populated after receiving server response
	this.betTime = null;
	this.id = null;
	this.cashoutValue = null;
}

SingleBet.prototype.estimatedReturns = function() {
	var result = this.stake == '' ? 0.0 : parseFloat(this.stake);
	return result * parseFloat(this.betPart.selection.decimalOdds);
};


SingleBet.prototype.estimatedReturnsDisplayVal = function() {
	var returns = this.estimatedReturns();
	if (isNaN(returns)) {
		return '0';
	}
	return returns.toFixed(2);
};

	
SingleBet.prototype.decimalOdds = function() {
	var result = 1.0;
	return result * parseFloat(this.betPart.selection.decimalOdds);
};

SingleBet.prototype.fractionalOdds = function() {
	return this.betPart.selection.fractionalOdds;
};
	
SingleBet.prototype.totalStake = function() {
	return this.stake == '' ? 0.0 : parseFloat(this.stake);
};
	
SingleBet.prototype.marketIdsString = function() {
	return 'mkt-' + this.betPart.selection.marketId;
};
	
SingleBet.prototype.betId = function() {
	return 'bet-' + this.betPart.selection.selectionId;
};

SingleBet.prototype.eventName = function() {
	return this.betPart.selection.eventName;
};

SingleBet.prototype.marketName = function() {
	return this.betPart.selection.marketName;
};

SingleBet.prototype.selectionName = function() {
	return this.betPart.selection.selectionName;
};

SingleBet.prototype.selectionId = function() {
	return this.betPart.selection.selectionId;
};

SingleBet.prototype.clone = function() {
	return new SingleBet(this.betPart.clone(), this.stake);
};
