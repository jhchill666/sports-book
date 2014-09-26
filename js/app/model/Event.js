define(['backbone',
        'app/model/Market',
        'common/util/CollectionUtil',
        'app/collection/MarketsCollection',
        'ctx'
],
function (Backbone, Market, collection, MarketsCollection, ctx) {
    return Backbone.Model.extend({

        Markets: null,

        defaults: {
            id : 0,
            code:'', //SOCCER
            compId : 0,
            name : "",
            state : "ACTIVE",
            displayed : true,
            offeredInplay : false,
            formattedEventTime:'',
            eventTime : 0,
            numMarkets : 0,
            inplay: false,
            genericInplayAttribs: {
                score: '',
                period: '',
                clock: '',
                participantA: '',
                participantB: ''
            }
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

            // parse markets
            if (_.has(options, 'markets')) {
                this.Markets = this.parseMarkets(options.markets, options.id);
                delete options.markets;
            }

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
            _.extend(data, {loaded: true});
            this.set(this.parse(data));
        },


//        initialize: function( options ) {
//            this.populate(options);
//        },

//        populateDefaults: function(data) {
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
//        },
        
//        populate: function(data){
//            var scope = this;
//            scope.data = data;
//            this.populateDefaults(data);
//
//            if (_.has(data, 'markets')) {
//                this.marketsCollection = this.parseMarkets(data.markets, this.id);
//            }
//
//            if (_.has(data, 'attributes')) {
//                var map = _.clone(scope.get("genericInplayAttribs"));
//                var mapChanged = false;
//                _.each(data.attributes.attrib, function(obj){
//                    if (_.has(map, obj.key)) {
//                        map[obj.key] = obj.value;
//                        mapChanged = true;
//                        scope.setInplay(true);
//                    }
//                });
//                if (mapChanged)
//                this.set("genericInplayAttribs", map);
//            }
//        },

        populateFromEventTradingState: function(data) {
            this.parse(data);

//            var scope = this;
//            scope.data = data;
//            this.populateDefaults(data);
//
//            if (_.has(data, 'prices')) {
//                var marketsArray = data.prices.market;
//                _.each(marketsArray, function(marketObj){
//                    var marketId = marketObj.id;
//                    if (_.has(marketObj, 'channel')) {
//                        if ( marketObj.channel.length >0 ) {
//                            marketObj.selection = marketObj.channel[0].selection;
//                        }
//                    }
//
//                    var market = scope.findMarket(marketObj.id);
//                    if (_.isUndefined(market)) {
//                        var newMarket = new Market(marketObj, scope.id);
//                        scope.marketsCollection.add(newMarket);
//                    } else {
//                        scope.listenToOnce(market,"change", scope.onMarketPropertyChange);
//                        market.populate(marketObj);
//                    }
//
//                });
//            }
        },

        onMarketPropertyChange: function(market) {
            var vent = ctx.get("vent");
            //FIXME MAKE THIS OBJECT STRONG.
            var changedObj = {};
            changedObj.eventId = market.eventId;
            changedObj.id = market.id;
            changedObj.changed = market.changed;
            vent.trigger('market:propertyChange', changedObj);
        },

        setInplay: function(isInplay) {
            this.set('inplay',isInplay);
        },
        
        getInplay: function(isInplay) {
            return this.get('inplay');
        },
        
        setParticipantA: function(name) {
            var updatedParticipant = _.clone(this.get("genericInplayAttribs"));
            updatedParticipant.participantA = name;
            this.set("genericInplayAttribs", updatedParticipant);
        },
        
        getParticipantA: function() {
            if (this.get('genericInplayAttribs').participantA == '') {
                var participants = this.get('name').split('vs');
                return participants[0];
            }
            return this.get('genericInplayAttribs').participantA;
        },
        
        setParticipantB: function(name) {
            var updatedParticipant = _.clone(this.get("genericInplayAttribs"));
            updatedParticipant.participantB = name;
            this.set("genericInplayAttribs", updatedParticipant);
        },
        
        getParticipantB: function() {
            if (this.get('genericInplayAttribs').participantB == '') {
                var participants = this.get('name').split('vs');
                return participants[1];
            }
            return this.get('genericInplayAttribs').participantB;
        },
        
        getInplayScore: function() {
            return this.get('genericInplayAttribs').score;
        },
        
        getInplayPeriod: function() {
            return this.get('genericInplayAttribs').period;
        },
        
        getInplayClock: function() {
            return this.get('genericInplayAttribs').clock;
        },


        /**
         * @param id
         * @returns {*}
         */
        findMarket: function(id){
            return this.Markets.get(id);
        },


        /**
         * @param id
         * @returns {*}
         */
        findSelection: function(id){
            var mkt = this.findMarketForSelection(id);
            return mkt.findSelection(id);
        },


        /**
         * Returns the parent market for the specified Selection
         * @param id
         * @returns {*}
         */
        findMarketForSelection: function(id){
            return _.find(this.Markets.models, function(m){
                var selection = m.findSelection(id);
                return !_.isUndefined(selection);
            })
        },


        /**
         * Returns all selections for the given market
         * @param id
         * @returns {*}
         */
        findMarketSelections: function(id){
            var mkt = this.findMarket(id);
            return mkt.Selections.models;
        },



//        parseMarkets: function(mkts, eventId){
//
//
//            var markets = _.map(mkts, function(m){
//                var params = _.extend(m, {id: m.id, eventId: eventId});
//                var myMarket = new Market(params);
//                return myMarket;
//            });
//            return new MarketsCollection(markets);
//        },


        /**
         * @param mkts
         * @param eventId
         * @returns {null|exports.Markets|*|Markets}
         */
        parseMarkets: function(mkts, eventId){
            if (_.isNull(this.Markets))
                this.Markets = new MarketsCollection();

            var that = this;
            _.each(mkts, function(m) {
                // ensure parent ids are set
                _.defaults(m, {eventId: eventId, parent: that});

                // if market doesn't already exist, create with the new market data
                if (that.findMarket(m.id) == null) {
                    that.Markets.add(new Market(m, {parse: true}));
                    return;
                }

                // otherwise update the existing market
                var market  = that.findMarket(s.id),
                    options = market.parse(s);
                market.set(options);
            });

            return that.Markets;
        },


        
        getCurrentEventTime: function() {
	         return this.get('genericInplayAttribs').clock;;
        }
        
    });
});

