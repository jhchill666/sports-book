define(function (require) {
    var Marionette = require('marionette');


    /**
     * Subscription types
     */

    var MarketTypeTopic = function(ids) { return JSON.stringify({name: 'marketTypes', ids: ids}); };
    var EventTopic = function(ids)      { return JSON.stringify({name: 'eventDetails', ids: ids}); };
    var ScheduleTopic = function(sport) { return JSON.stringify({name: 'schedule', ids: sport.toUpperCase()}); };


    var Ctrl = Marionette.Controller.extend({


        dependencies: 'vent, socket=socketService',
        cache: { route:'', subs: {}, data: {} },
        currentRoute: '',


        /**
         * Bind all public methods to this scope
         */
        initialize: function(){
            _.bindAll.apply(_, [this].concat(_.functions(this)));
        },


        /**
         * @param options
         */
        ready: function() {
            var that = this;
            // updates the currentRoute when the 'before:routeChange' event is received
            this.vent.bind('router:before:routeChange', function() {
                var args = Array.prototype.slice.apply(arguments);
                that.currentRoute = args[0];
            });
        },


        /**
         * Sends the subscription request to the socket
         * @param s Array of subscription Topic Objects
         */
        send: function(s) {
            if (this.shouldResubscribe(s)) {
                console.log('Socket: UpdateSubcriptions: '+this.cache.data);
                this.socket.send(this.cache.data);
            }
        },


        /**
         * @returns {boolean}
         */
        shouldResubscribe: function(s) {
            // if the route has changed since the last subscription
            // request, we need to start pooling subscription topics
            // from scratch.  Therefore we need to overwrite the
            // current pool, using the new route as the identifier
            var lastRequest  = this.cache.data;

            // if overwriting previous subscriptions, use an empty
            // array as the source for the concat, not the 'subs' cache
            this.cache.subs  = this.consolidateSubs(s);
            this.cache.data  = this.serializeSubs();
            this.cache.route = this.currentRoute;

            // if the request json doesn't match the last request
            // sent, or if there are zero subs, return truey
            return this.cache.data !== lastRequest && !!_.size(this.cache.subs);
        },


        /**
         * Consolidates any new subs into existing
         * subs of the same type - if there are any
         * @param subs
         * @returns {Array}
         */
        consolidateSubs: function(subs) {
            var overwrite = this.currentRoute !== this.cache.route;
            if (overwrite) return [];

            _.each(subs, function(s) {
                var newSub = JSON.parse(s),
                    oldSub = this.cache.subs[newSub.name];

                // no previous subscription for this topic,
                // so simply add the new sub to the cache
                if (!oldSub)
                    this.cache.subs[newSub.name] = JSON.stringify(newSub);

                else {
                    // parse the sub to a rwadable format
                    oldSub = JSON.parse(oldSub);

                    var oldIds = String.prototype.split.call(oldSub.ids, ',');
                    var newIds = String.prototype.split.call(newSub.ids, ',');

                    // and join all ids to create the new array
                    oldSub.ids = _.union(oldIds, newIds).join(',');
                    this.cache.subs[newSub.name] = JSON.stringify(oldSub);
                }
            }, this);

            return this.cache.subs;
        },


        /**
         * Serializes the subscription instances, ensuring there are no duplicates
         * @returns {*}
         */
        serializeSubs: function() {
            var subs = _.values(this.cache.subs),
                subs = _.map(subs, function(sub) {
                    return JSON.parse(sub);
                })
            var obj  = { UpdateSubcriptions: { subscriptions: subs }};
            return JSON.stringify(obj);
        },


        /**
         * @param sports
         * @param eventIds
         * @param marketTypes
         */
        subscribeToMarketsAndSchedule: function(sports, eventIds, marketTypes) {
            this.send([ EventTopic(eventIds), MarketTypeTopic(marketTypes), ScheduleTopic(sports) ]);
        },


        /**
         * @param sports
         * @param eventIds
         */
        subscribeToEventsAndSchedule: function(sports, eventIds) {
            this.send([ EventTopic(eventIds), ScheduleTopic(sports) ]);
        },


        /**
         * @param eventIds
         */
        subscribeToEventDetails: function(eventIds) {
            this.send([ EventTopic(eventIds) ]);
        },


        /**
         *
         * @param sports
         */
        subscribeToSchedule: function(sports) {
            this.send([ ScheduleTopic(sports) ]);
        }
    });

    return Ctrl;
});


