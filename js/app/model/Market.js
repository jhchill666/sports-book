define(['backbone',
        'app/model/Selection',
        'app/collection/SelectionsCollection',
        'ctx'
],
function (Backbone, Selection, SelectionsCollection, ctx) {
    return Backbone.Model.extend({

        Selections: null,

        defaults: {
          eventId:0,
          id : 0,
          name : "",
          type : "MRES",
          displayOrder : -500,
          columnCount : 0,
          suspended : false,
          state : 'OPEN',
          displayed : true,
          mostBalanced : false
        },


        /**
         * Overrides the internal backbone parse method that automatically gets call when a model
         * is instantiated with constructor function options.  No need to invoke additional parsing
         * methods from the initialize function, as this object is sets as the models defaults.  We
         * simply need to use parse to transform a few values to the right format.
         * @param options
         * @returns {*}
         */
        parse: function(options){

            // parse inplayAttributes
            if (_.has(options, 'attributes')) {
                var attribs = _.flatten(options.attributes.attrib);
                _.reduce(attribs, function(obj, val){
                    obj[val.key] = val.value; return obj;
                }, options);

                delete options.attributes;
            }

            // parse selections
            if (_.has(options, 'selection')) {
                this.Selections = this.parseSelections(options.selection, options.id, options.eventId);
                delete options.selection;
            }
//
            // transform some of the values
            if (_.has(options, 'state')) {
                var state = options.state;
                if (state == 'S') state = 'SUSPENDED';
                if (state == 'A') state = 'ACTIVE';
                if (state == 'V') state = 'VOID';
            }

            // transform 'displayed' to booleans
            if (_.has(options, 'displayed')) {
                options.displayed = !!options.displayed;
            }

            return options;
        },


        /**
         * @param data
         */
        update: function(data) {
            this.set(this.parse(data));
        },


        
//        initialize: function(data) {
//            this.populate(data);
//        },
        
//        populate: function(data){
//            var scope = this;
//            scope.data = data;
//            _.each(data, function(val, key){
//                if (key == 'id') scope.set('id', val);
//                if (_.has(scope.defaults, key)) {
//                    if (scope.attributes[key] != val) {
//                        if (key == 'state') {
//                            if (val == 'S') {
//                                val = 'SUSPENDED';
//                            }
//                            if (val == 'A') {
//                                val = 'ACTIVE';
//                            }
//                            if (val == 'V') {
//                                val = 'VOID';
//                            }
//                        }
//
//                        if (key == 'displayed') {
//                            if (val == 0) {
//                                val = false;
//                            }
//                            if (val == 1) {
//                                val = true;
//                            }
//                        }
//
//                        scope.set(key, val);
//                    }
//                }
//            });
//
//            if (_.has(data, 'selection')) {
//                this.selections = this.parseSelections(data.selection, this.get('id'), this.get('eventId'));
//            }
//        },


        /**
         * @param id
         * @returns {*}
         */
        findSelection: function(id){
            return this.Selections.get(id);
        },

        
//        onSelectionPriceChange: function(event) {
//            var myChangedValue = event.changed;
//            var vent = ctx.get("vent");
//            var oddsFactory = ctx.get("oddsFactory");
//            var oddsObj = oddsFactory.getOddsByIndex(myChangedValue.rootIdx);
//            event.set('decimalOdds',oddsObj.decimal);
//            event.set('fractionalOdds',oddsObj.fractional);
//
//            vent.trigger('selection:priceChange', event);
//        },
        
//        parseSelections: function(selection, marketId, eventId){
//            var scope = this;
//            var selections = _.map(selection, function(s){
//                var options = {};
//                options.marketId = marketId;
//                options.eventId = eventId;
//                if (_.has(s, 'odds')) {
//                    s.decimalOdds = s.odds.dec;
//                    s.fractionalOdds = s.odds.frac;
//                    s.rootIdx = s.odds.rootIdx;
//                }
//                var selection = scope.findSelection(s.id);
//                if (_.isUndefined(selection)) {
//                    selection = new Selection(s, options);
//                } else {
//                    //Add Listener here?
//                    //selection.listenToOnce("change:rootIdx", scope.onSelectionPriceChange);
//                    scope.listenToOnce(selection,"change:rootIdx", scope.onSelectionPriceChange);
//                    //s.rootIdx += 1;
//                    selection.populate(s);
//                }
//                return selection;
//            });
//            return collection.factory(Selection, selections);
//        },


        /**
         * @param selections
         * @param marketId
         * @param eventId
         * @returns {null|exports.Selections|*}
         */
        parseSelections: function(selections, marketId, eventId){
            if (_.isNull(this.Selections))
                this.Selections = new SelectionsCollection();

            var that = this;
            _.each(selections, function(s) {
                // ensure parent ids are set
                _.defaults(s, {marketId: marketId, eventId: eventId, parent: that});

                // if market doesn't already exist, create with the new market data
                if (that.findSelection(s.id) == null) {
                    that.Selections.add(new Selection(s, {parse: true}));
                    return;
                }

                // otherwise update the existing market
                var selection = that.findSelection(s.id),
                    options   = selection.parse(s);
                selection.set(options);
            });

            return that.Selections;
        }

        
        
    });
});

