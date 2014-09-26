/**
 * Created by Jamie on 18/09/2014.
 */
define([
    'backbone','app/model/Event'
],
function(Backbone,Event) {
    return Backbone.Model.extend({


        defaults: {
            sport: '',
            keyMarketTypes:null,
            inplay: [],
            prematch: [],
            coupons: [],
            competitions: [],
            competitionEvents:[],
            couponEvents:[],
            groupedEvents:[]
        },


        getGroupedEvents: function() {
            return this.get('groupedEvents');
        },

        setGroupedEvents: function(collection) {
            // sort by date
            _.sortBy(collection, function(group) {
                return group.date;
            });

            this.set('groupedEvents', collection);
        },

        removeEventFromInplay: function(eventData) {
            var collection = this.get('inplay');
            var existingEvent = this.findEventById(eventData.id);

            var index = _.indexOf(collection, existingEvent);
            if ( index != -1) {
                collection.splice(index,1);
                this.set('inplay', collection);
            }
        },


        removeEventFromPrematch: function(eventData) {
            var collection = this.get('prematch');
            var existingEvent = this.findEventById(eventData.id);

            var index = _.indexOf(collection, existingEvent);
            if ( index != -1) {
                collection.splice(index,1);
                this.set('prematch', collection);
            }
        },

        addEventToInplay: function(eventData) {
            var event = new Event(eventData);
            var collection = this.get('inplay');
            collection.push(event);
            this.set('inplay', collection);
        },

        addEventToPrematch: function(eventData) {
            var event = new Event(eventData);
            var collection = this.get('prematch');
            collection.push(event);
            this.set('prematch', collection);
        },

        getInplay: function() {
            return this.get('inplay');
        },

        setInplay: function(inplay,silent) {
            //silent boolean to dispatch model change event.
            var collection = [];
            if ( inplay.event ) {
                for (var i = 0; i < inplay.event.length; i++) {
                    var eventData = inplay.event[i];
                    var event = new Event(eventData);
                    collection.push(event);
                }
            }
            this.set('inplay', collection,{"silent":silent});
        },

        getPrematch: function() {
            return this.get('prematch');
        },

        setPrematch: function(prematch,silent) {
            //silent boolean to dispatch model change event.
            var collection = [];
            if ( prematch.event ) {
                for (var i = 0; i < prematch.event.length; i++) {
                    var eventData = prematch.event[i];
                    var event = new Event(eventData);
                    collection.push(event);
                }
            }
            this.set('prematch', collection,{"silent":silent});
        },

        getCompetitionsNameById: function(compId) {
            var name = "";
            this.get('competitions').forEach(function(country){
                country.competition.forEach(function(comp){
                    if(comp.id == compId) {
                        name = comp.name;
                    }
                });
            });
            return name;
        },

        getCompetitions: function() {
            return this.get('competitions');
        },

        setCompetitions: function(category) {
            this.set('competitions', category);
        },

        getCoupons: function() {
            return this.get('coupons');
        },

        setCoupons: function(coupon) {
            this.set('coupons', coupon);
        },

        setSportCodes: function(sports) {
            this.set('sportCodes',sports);
        },

        getSportCodes: function() {
            return this.get('sportCodes');
        },

        //TODO I DONT THINK THE EVENTS FROM COMPETITION ID SHOULD BE HERE
        getCompetitionEvents: function() {
            return this.get('competitionEvents');
        },

        setCompetitionEvents: function(competitions) {
            //silent boolean to dispatch model change event.
            var collection = [];
            if ( competitions ) {
                for (var i = 0; i < competitions.length; i++) {
                    var eventData = competitions[i];
                    var event = new Event(eventData);
                    collection.push(event);
                }
            }
            this.set('competitionEvents', collection);
        },

        //TODO I DONT THINK THE EVENTS FROM COMPETITION ID SHOULD BE HERE
        getCouponEvents: function() {
            return this.get('couponEvents');
        },

        setCouponEvents: function(coupons) {
            //silent boolean to dispatch model change event.
            var collection = [];
            if ( coupons ) {
                for (var i = 0; i < coupons.length; i++) {
                    var eventData = coupons[i];
                    var event = new Event(eventData);
                    collection.push(event);
                }
            }
            this.set('couponEvents', collection);
        },

        getPrematchAndInplay: function() {
            return this.get('inplay').concat(this.get('prematch'));
        },

        findEventById: function(id){
            return _.find(this.getPrematchAndInplay(), function(e){
                return (e.id == id);
            })
        },

        setParticipants: function(eventId, data) {
            var collection = this.getPrematchAndInplay();
            for (var i=0;i<collection.length;i++) {
                var event = collection[i];
                if (event.id == eventId) {
                    var particpantA = data[0];
                    var particpantB = data[1];
                    if (!_.isUndefined(particpantA)){
                        event.setParticipantA(particpantA.name);
                    }
                    if (!_.isUndefined(particpantB)){
                        event.setParticipantB(particpantB.name);
                    }
                    this.trigger("change:participants", event);
                    break;
                }
            }
        },

        updateComplete: function() {
            this.trigger("updateComplete", {});
        }

    });
});


