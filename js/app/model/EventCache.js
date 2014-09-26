define(['backbone', 'app/model/Event'],
    function (Backbone, Event) {
        return Backbone.Collection.extend({
            model: Event,


            /**
             * On initialization, we want to listen to the event tree for event
             * selection/unselections, and also parse any initially provided events
             * @param events
             */
            initialize: function(evts){
                this.addAll(evts);
            },


            /**
             * Factory method to create an Event instance and add to the cache
             * @param data
             * @returns {*}
             */
            create: function(evt) {
                if (_.isUndefined(evt)) return;
                if (this.hasntEvent(evt.id)) {
                    var evt = new Event(evt, {parse: true});
                    this.addEvent(evt);
                }
                return this.getEvent(evt.id);
            },


            /**
             * Adds an event instance to the cache if it doesn't
             * exist, otherwise returns the existing event
             * @param event
             */
            addEvent: function(evt) {
                if (_.isUndefined(evt)) return;
                if (this.hasntEvent(evt.id))
                    this.add(evt);
                return this.getEvent(evt.id);
            },


            /**
             * Adds an array of events
             * @param evts
             */
            addAll: function(evts) {
                if (_.isUndefined(evts)) return;
                _.each(evts, this.addEvent, this);
            },


            /**
             * Retrieve an Event from teh collection
             * @param id
             */
            getEvent: function(id){
                return this.get(parseInt(id));
            },


            /**
             * Check if an event exists
             * @param id
             */
            hasEvent: function(id){
                return !_.isUndefined(this.getEvent(id));
            },


            /**
             * check if event event doesn't exist
             * @param id
             */
            hasntEvent: function(id){
                return !this.hasEvent(this.getEvent(id));
            },


            /**
             * Adds an array of events
             * @param evts
             */
            removeAll: function(evts) {
                _.each(evts, this.removeEvent, this);
            }
        });
    });