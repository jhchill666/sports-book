/**
 * Created by Jamie on 18/09/2014.
 */
define([
    'backbone',
    'app/model/SportSchedule'
],
function (Backbone, SportSchedule) {
    var Sports = Backbone.Collection.extend({

        model: SportSchedule,
        comparator: function(schedule) {
            return schedule.get('sport');
        }
    });

    return Sports;
});

