define(function () {

    function OddsFactory(oddsLadder, priceAdjust) {

    var rootLadder = oddsLadder;
    var priceAdjustment = priceAdjust;

    var getAdjustedFractionalOdds = function(selection) {
        var newIndex = priceAdjustment + selection.attributes.rootIndex;
        if (newIndex >= 0) {
            var oddsObj = rootLadder[newIndex];
            if (oddsObj) {
                return oddsObj.fractional;
            }
        }

        return selection.attributes.fractionalOdds;
    };

    var getAdjustedDecimalOdds = function(selection) {
        var newIndex = priceAdjustment + selection.attributes.rootIndex;
        if (newIndex >= 0) {
            var oddsObj = rootLadder[newIndex];
            if (oddsObj) {
                return oddsObj.decimal;
            }
        }

        return selection.attributes.decimalOdds;
    };

    return {
        
        setOddsLadder: function(ladder) {
            rootLadder = ladder;
        },
        
        setPriceAdjustment: function(adjustment) {
            priceAdjustment = adjustment;
        },
     
        getOddsByIndex: function(index) {
            var newIndex = priceAdjustment + index;
            var oddsObj = rootLadder[newIndex];
            if (newIndex >= 0) {
                return oddsObj;
            }
            return null;
        },
        
        getOdds: function(oddsType, selection) {
            var oddsToReturn;
            switch (oddsType)
            {
                case 'FRACTION':
                    oddsToReturn = priceAdjustment == 0 ? selection.attributes.fractionalOdds : getAdjustedFractionalOdds(selection);
                    break;
                case 'DECIMAL':
                    oddsToReturn = priceAdjustment == 0 ? selection.attributes.decimalOdds : getAdjustedDecimalOdds(selection);
                    break;
                case 'AMERICAN':
                    var decimalOdds = priceAdjustment == 0 ? selection.attributes.decimalOdds : getAdjustedDecimalOdds(selection);
                    var moneyLine = decimalOdds >= 2 ? (decimalOdds - 1) * 100 : (-100) / (decimalOdds - 1);
                    oddsToReturn = parseInt(moneyLine);
                    break;
            }
            return oddsToReturn;
        }

    };

}
        
    return OddsFactory;
});


    