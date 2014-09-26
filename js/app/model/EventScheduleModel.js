define([
    'backbone',
    'app/model/Event',
    'common/util/CollectionUtil'],
function(Backbone,Event, collection) {
        return Backbone.Model.extend({
            dependencies: 'eventCache',


            defaults: {
                sportCode:null,
                keyMarketTypes:[],
                inplay: [],
                prematch: [],
                coupons: [],
                competitions: [],
                competitionEvents:[],
                couponEvents:[],
                groupedEvents:[]
            },


            /**
             *
             */
            ready: function() {
                _.bindAll.apply(_, [this].concat(_.functions(this)));
            },


            /**
             * @returns {Mixed|*}
             */
            getGroupedEvents: function() {
                return this.get('groupedEvents');
            },


            /**
             * @param collection
             */
            setGroupedEvents: function(collection) {
                // sort by date
                _.sortBy(collection, function(group) {
                    return group.date;
                });

                this.set('groupedEvents', collection);
            },


            /**
             * @returns {Mixed|*}
             */
            getPrematch: function() {
                return this.get('prematch');
            },


            /**
             * @param prematch
             * @param silent
             */
            setPrematch: function(prematch,silent) {
                this.addEvents(prematch.event, 'prematch', silent);
            },


            /**
             * @param eventData
             */
            addEventToPrematch: function(eventData) {
                var collection = this.getPrematch();
                collection.add(this.eventCache.create(eventData));
            },


            /**
             * @param eventData
             */
            removeEventFromPrematch: function(eventData) {
                var collection = this.getPrematch();
                collection.remove(eventData.id);
            },


            /**
             * @returns {Mixed|*}
             */
            getInplay: function() {
                return this.get('inplay');
            },


            /**
             * @param inplay
             * @param silent
             */
            setInplay: function(inplay, silent) {
                this.addEvents(inplay.event, 'inplay', silent);
            },


            /**
             * @param eventData
             */
            addEventToInplay: function(eventData) {
                var collection = this.getInplay();
                collection.add(this.eventCache.create(eventData));
            },


            /**
             * @param eventData
             */
            removeEventFromInplay: function(eventData) {
                var collection = this.getInplay();
                collection.remove(eventData.id);
            },


            /**
             * @returns {Array|string}
             */
            getPrematchAndInplay: function() {
                var combined = new Backbone.Collection();
                combined.add(this.getPrematch().models);
                combined.add(this.getInplay().models);
                return new Backbone.Collection(combined);
            },


            /**
             * @returns {Mixed|*}
             */
            getCompetitions: function() {
                return this.get('competitions');
            },


            /**
             * @param category
             */
            setCompetitions: function(category) {
                this.set('competitions', category);
            },


            /**
             * @returns {Mixed|*}
             */
            getCompetitionEvents: function() {
                return this.get('competitionEvents');
            },


            /**
             * @param competitions
             */
            setCompetitionEvents: function(competitions, silent) {
                this.addEvents(competitions, 'competitionEvents', silent);
            },


            /**
             * @param compId
             * @returns {string}
             */
            getCompetitionsNameById: function(compId) {
                var name = "";
                _.each(this.getCompetitions(), function(country) {
                    _.each(country.competition, function(c){
                        if(c.id == compId) {
                            name = comp.name;
                        }
                    })
                });
                return name;
            },


            /**
             * @returns {Mixed|*}
             */
            getCoupons: function() {
                return this.get('coupons');
            },


            /**
             * @param coupon
             */
            setCoupons: function(coupon) {
                this.set('coupons', coupon);
            },


            /**
             * @returns {Mixed|*}
             */
            getCouponEvents: function() {
                return this.get('couponEvents');
            },


            /**
             * @param coupons
             * @param silent
             */
            setCouponEvents: function(coupons, silent) {
                this.addEvents(coupons, 'couponEvents', silent);
            },


            /**
             * @param id
             * @returns {*}
             */
            findEventById: function(id){
                return this.eventCache.getEvent(id);
            },


            /**
             * @param event
             * @param name
             * @param silent
             */
            addEvents: function(events, name, silent) {
                events = events || {}; var evts = [];

                _.each(events, function(evt){
                    evts.push(this.eventCache.create(evt));
                }, this);

                var coll = collection.factory(Event, evts);
                this.set(name, coll, {silent: silent});
            },


            /**
             * @param eventId
             * @param data
             */
            setParticipants: function(eventId, data) {
                var collection = this.getPrematchAndInplay(),
                    that = this;

                _.each(collection, function(event){
                    if (event.id == eventId) {
                        var particpantA = data[0];
                        var particpantB = data[1];

                        if (!_.isUndefined(particpantA)) {
                            event.setParticipantA(particpantA.name);
                        }
                        if (!_.isUndefined(particpantB)){
                            event.setParticipantB(particpantB.name);
                        }
                        that.trigger("change:participants", event);
                    }
                });
            },

            updateComplete: function() {
                this.trigger("updateComplete", {});
            }

        });
    });


