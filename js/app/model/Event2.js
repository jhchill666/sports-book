/**
 * Created by Jamie on 19/09/2014.
 */
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
             * Initial population when instantiating a new Event
             * @param data
             */
            populate: function(data){
                var that = this;

                // parse defaults
                _.each(data, function(val, key){
                    // leave parsing of attribute to next code block
                    if (key == 'attributes') return;

                    // transform some of the values
                    if (key == 'state') {
                        if (val == 'S') val = 'SUSPENDED';
                        if (val == 'A') val = 'ACTIVE';
                        if (val == 'V') val = 'VOID';
                    }

                    if (key == 'displayed') {
                        if (val == 0) val = false;
                        if (val == 1) val = true;
                    }

                    // If the model contains a similarly named attribute, but
                    // doesn't have the same value, or if the attribute doesn't
                    // exist, add/update it
                    if (that.attributes[key] != val || !_.isEmpty(val))
                        that.set(key, val);
                });

                // parse defaults
                if (_.has(data, 'attributes')) {

                    _.each(data.attributes.attrib, function(obj) {
                        if (that.attributes.genericInplayAttribs[obj.key] != obj.val || !_.isEmpty(obj.val))
                            that.attributes.genericInplayAttribs[obj.key] = obj.value;
                    });
                }

                // parse markets
                if (_.has(data, 'markets'))
                    that.Markets = this.parseMarkets(data.markets, this.id);
            },


            /**
             * @param mkts
             * @param eventId
             * @returns {Markets}
             */
            parseMarkets: function(mkts, eventId){
                if (_.isUndefined(this.Markets))
                    this.Markets = new MarketsCollection();

                var that = this;
                _.each(mkts, function(m) {
                    // ensure parent ids are set
                    _.defaults(m, {eventId: eventId});

                    // if market doesn't already exist, create with the new market data
                    if (that.Markets.has(m.id) == false) {
                        that.Markets.add(new Market(m));
                        return;
                    }

                    // otherwise update the existing market
                    that.getMarket(m.id).populate(m)
                });

                return that.Markets;
            },


            /**
             * -------------------------------------------------------------
             * Utility methods
             * -------------------------------------------------------------
             */


            /**
             * @param id
             * @returns {*}
             */
            getMarket: function(id){
                return this.Markets.findWhere({id:id});
            },


            /**
             * Returns the instrument with the specified id
             * @param id
             * @returns {*}
             */
            getSelection: function(id){
                var mkt = this.getMarketForSelection(id);
                return mkt.getSelection(id);
            },


            /**
             * Returns the parent market for the specified Instrument
             * @param id
             * @returns {*}
             */
            getMarketForSelection: function(id){
                return _.find(this.Markets.models, function(m){
                    var selection = m.getSelection(id);
                    return (typeof selection !== 'undefined');
                })
            }
        });
    });

