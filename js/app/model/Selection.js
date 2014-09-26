define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({

        defaults: {
            eventId:0,
            marketId:0,
            id : 0,
            state:'ACTIVE',
            name : "",
            type : "D",
            suspended : false,
            displayed: true,
          
            pos: {
                row : 1,
                col : 1
            },
            
            //Flattened structure instead of the odds object below returned from the schedule.
            decimalOdds:  "1.53",
            fractionalOdds: "8/15",  
            rootIdx: 0,
            
//            oddsToDisplay:null,
//            odds: {
//                dec: "1.53",
//                frac:  "8/15",
//                rootIdx : 656
//            }
        },



        /**
         * Overrides the internal backbone parse method that automatically gets call when a model
         * is instantiated with constructor function options.  No need to invoke additional parsing
         * methods from the initialize function, as this object is sets as the models defaults.  We
         * simply need to use parse to transform a few values to the right format.
         * @param options
         * @returns {*}
         */
        parse: function(options) {

            // convert prices
            if (_.has(options, 'odds')) {
                options.decimalOdds = options.odds.dec;
                options.fractionalOdds = options.odds.frac;
                options.rootIdx = options.odds.rootIdx;
                delete options.odds;
            }

            // transform 'displayed' to booleans
            if (_.has(options, 'displayed')) {
                options.displayed = !!options.displayed;
            }

            // add decimal value to initial display value
//            if (_.has(options, 'decimalOdds'))
//                options.oddsToDisplay = options[decimalOdds];

            return options;
        },


        /**
         * @param data
         */
        update: function(data) {
            this.set(this.parse(data));
        },

        
//        initialize: function( data, options ) {
//            this.populate(data);
//            //this.marketId = options.marketId;
//            //this.eventId = options.eventId;
//            this.set('marketId',options.marketId);
//            this.set('eventId',options.eventId);
//        },
        
//        populate: function(data){
//            var scope = this;
//            scope.data = data;
//            var decimalValue;
//            var priceChanged = false;
//
//            _.each(data, function(val, key){
//                if (_.has(scope.defaults, key))
//                    if (scope.defaults[key] != val) {
//                        scope.set(key, val);
//                        if (key == 'decimalOdds') {
//                            decimalValue = val;
//                            priceChanged = true;
//                        }
//                    }
//            });
//
//            if (priceChanged) {
//                this.setDisplayedOdds(decimalValue);
//            }
//        },


        /**
         * @param value
         */
//        setDisplayedOdds: function(value) {
//            this.set('oddsToDisplay', value);
//        },

        /**
         * @returns {Mixed|*}
         */
//        getDisplayedOdds: function() {
////            if (this.get('oddsToDisplay') !=null) {
////                return this.get('oddsToDisplay');
////            }
//            return this.get('fractionalOdds');
//        },


        /**
         * @returns {Mixed|*}
         */
        getOdds: function(format) {
            var oddsType = 'fractionalOdds';
            switch(format) {
                case 'DECIMAL' : oddsType = 'decimalOdds'; break;
                case 'AMERICAN' : oddsType = 'rootIdx'; break;
            }
            return this.get(oddsType);
        }
    });
});


