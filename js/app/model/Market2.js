/**
 * Created by Jamie on 19/09/2014.
 */
define([
    'backbone',
    'app/model/Market',
    'app/model/Selection2',
    'app/collection/SelectionsCollection'
],
function (Backbone, Market, Selection2, SelectionsCollection) {
    return Backbone.Model.extend({

        Selections: null,

        defaults: {
            eventId:0,
            id : 0,
            name : "",
            type : "",
            displayOrder : -500,
            columnCount : 0,
            suspended : false,
            state : 'OPEN',
            displayed : true,
            mostBalanced : false
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
            });

            // parse selections
            if (_.has(data, 'selection'))
                this.Selections = this.parseSelections(data.selection, this.id, this.get('eventId'));
        },


        /**
         * @param s
         * @param marketId
         * @param eventId
         * @returns {*|void|*}
         */
        parseSelections: function(selections, marketId, eventId){
            if (_.isUndefined(this.Selections))
                this.Selections = new SelectionsCollection();

            var that = this;
            _.each(selections, function(s){
                // ensure selection has parent market and event ids set
                _.defaults(s, {marketId: marketId, eventId: eventId});

                // parse odds
                if (_.has(s, 'odds')) {
                    s.decimalOdds = s.odds.dec;
                    s.fractionalOdds = s.odds.frac;
                    s.rootIdx = s.odds.rootIdx;
                }

                // if selection doesn't already exist, create with the new data
                if (that.Selections.has(s.id) == false) {
                    that.Selections.add(new Selection2(s));
                    return;
                }

                // otherwise update the existing selection
                that.getSelection(s.id).populate(s);
            });

            return this.Selections;
        },


        /**
         * -------------------------------------------------------------
         * Utility methods
         * -------------------------------------------------------------
         */


        /**
         * Returns the Instrument with the specified id
         * @param type
         */
        getSelection: function(id){
            return this.findWhere({id:id});
        }
    });
});

