/**
 * Created by Jamie on 17/09/2014.
 */
define([
    'backbone',
    'app/model/Event2',
    'common/util/CollectionUtil',
    'ctx'
],
function (Backbone, Event2) {
    var Events = Backbone.Collection.extend({
        model: Event2,


        /**
         * Sort by eventTime
         * @param market
         * @returns {*}
         */
        comparator: function(event) {
            return event.get('eventTime');
        }
    });

    return Events;
});

