/**
 * Created by Jamie on 17/09/2014.
 */
define([
    'backbone',
    'app/model/Market',
    'common/util/CollectionUtil',
    'ctx'
],
function (Backbone, Market) {
    var Markets = Backbone.Collection.extend({

        model: Market,


        /**
         * Sort by displayOrder
         * @param market
         * @returns {*}
         */
        comparator: function(market) {
            return market.get('displayOrder');
        },


        /**
         * @param options
         */
        byDisplayed: function(displayed) {
            var filtered = this.filter(function(market) {
                return market.get("displayed") === displayed;
            });
            return new Markets(filtered);
        },


        /**
         * @param types
         * @returns {Markets}
         */
        byTypes: function(types) {
            // if no markets types, show everything
            if (_.size(types) == 0)
                return new Markets(this.models);

            // then filter out markets without matching types
            var filtered = this.filter(function(market) {
                var marketType = market.get('type');
                return _.contains(types, marketType);
            });
            return new Markets(filtered);
        },


        /**
         * @param attrib
         * @param value
         * @returns {Markets}
         */
        byAttrib: function(attrib, value) {
            var filtered = this.filter(function(market) {
                return market.get(attrib) == value;
            });
            return new Markets(filtered);
        },


        byMostBalanced: function() {
            var filtered = this.filter(function(market) {
                // if undisplayed return false
                if (market.attributes.displayed == false)
                    return false;

                return !((market.attributes.type == 'OVUN' && market.attributes.mostBalanced == false) ||
                         (market.attributes.type == 'OUH1'&& market.attributes.mostBalanced == false));
            });
            return new Markets(filtered);
        }
    });

    return Markets;
});

