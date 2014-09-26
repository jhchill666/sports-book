/**
 * Created by Jamie on 17/09/2014.
 */
define([
    'backbone',
    'app/model/Selection',
    'common/util/CollectionUtil',
    'ctx'
],
function (Backbone, Selection) {
    var Events = Backbone.Collection.extend({
        model: Selection,


        /**
         * Sort by displayOrder
         * @param market
         * @returns {*}
         */
        comparator: function(selection) {
            var pos = selection.get('pos');
            return _.isUndefined(pos) ? 0 : pos.col;
        }
    });

    return Events;
});

