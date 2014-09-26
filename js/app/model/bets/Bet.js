/**
 * example:
 * parts = [BetPart object, BetPart object, ...] refer BetPart.js
 * stake = 1
 * type = SINGLE, usually
 */
function Bet(parts, stake, type) {
	
	this.parts = parts;
	this.stake = stake;
	this.type = type;
	
}

Bet.prototype.estimatedReturns = function() {
	var result = this.stake == '' ? 0.0 : parseFloat(this.stake);
	
	for (var i = 0; i < this.parts.length; i++) {
		result = result * parseFloat(this.parts[i].selection.decimalOdds);
	}
	
	return result;
};
	
Bet.prototype.decimalOdds = function() {
	var result = 1.0;
	
	for (var i = 0; i < this.parts.length; i++) {
		result = result * parseFloat(this.parts[i].selection.decimalOdds);
	}
	
	return result;
};

Bet.prototype.fractionalOdds = function() {
	return '';
};
	
Bet.prototype.totalStake = function() {
	return this.stake == '' ? 0.0 : parseFloat(this.stake);;
};
	
Bet.prototype.marketIdsString = function() {
	var marketIds = [];
	for (var i = 0; i < this.parts.length; i++) {
		marketIds.push(this.parts[i].selection.marketId);
	}
	marketIds.sort();
	
	var retValue = "mkt";
	for (var i = 0; i < marketIds.length; i++) {
		retValue = retValue + '-' + marketIds[i];
	}
	return retValue;
};
	
Bet.prototype.betId = function() {
	var selectionIds = [];
	for (var i = 0; i < this.parts.length; i++) {
		selectionIds.push(this.parts[i].selection.selectionId);
	}
	selectionIds.sort();
	
	var retValue = "bet";
	for (var i = 0; i < selectionIds.length; i++) {
		retValue = retValue + '-' + selectionIds[i];
	}
	return retValue;
};

Bet.prototype.eventName = function() {
	return '';
};

Bet.prototype.marketName = function() {
	return '';
};

Bet.prototype.selectionName = function() {
	return '';
};

Bet.prototype.clone = function() {
	var cloneBet = new Bet([], 0.0);
	cloneBet.type = this.type;
	for (var i = 0; i < this.parts.length; i++) {
		var cloneBetPart = this.parts[i].clone();
		cloneBet.parts.push(cloneBetPart);
	}
	return cloneBet;
};