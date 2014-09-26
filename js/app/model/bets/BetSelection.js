function BetSelection(eventId, eventName, marketId, marketName, marketState, 
		selectionId, selectionName, fractionalOdds, decimalOdds) {
	
	this.eventId = eventId;
	this.eventName = eventName;
	this.marketId = marketId;
	this.marketName = marketName;
	this.marketState = marketState;
	this.selectionId = selectionId;
	this.selectionName = selectionName;
	
        this.fractionalOdds = fractionalOdds;
	this.decimalOdds    = decimalOdds;
    	
	//These are optional attributes from getEvent api.
	this.isEachWayAvailable = false;
	this.isTricastAvailable = false;
	this.numPlaces = 0;
	this.deduction = "";
	this.isForecastAvailable = false;
	this.isSPAvailable = false;
        
        this.line = null;
	
	this.selected = false;
}