/**
 * Created by Jamie on 18/09/2014.
 */
define([
        'marionette',
        'common/util/IdUtil'
    ],
    function(Marionette, IdUtil) {

        return Marionette.View.extend({


            dependencies: 'vent, oddsFactory, schedule=eventScheduleModel, model=eventDetailsModel',
            currentRoute: '',
            events: {
                'click a[id*=-selection-]': 'onSelectionClick'
            },


            /**
             *
             */
            initialize: function() {
                _.bindAll(this, 'onSelectionPriceChange');
            },


            /**
             *
             */
            ready: function() {
                this.vent.on('router:before:routeChange', this.onRouteChange);
                this.vent.on('selection:priceChange', this.onSelectionPriceChange);
            },


            /**
             * @param event
             */
            onSelectionClick: function(event) {
                var id = $(event.currentTarget).attr('id'),
                    eventId = $(event.currentTarget).attr('eventid'),
                    options = {
                        selectionId: IdUtil.extract(id),
                        eventId: IdUtil.extract(eventId)
                    };

                if (this.isEventPage())
                    _.extend(options, {event: this.model.getEventDetails()});
                this.vent.trigger('selection:click', options);
            },


            /**
             * @param selection
             */
            onSelectionPriceChange: function(s) {
                var newOdds  = this.oddsFactory.getOdds(App.globals.priceFormat, s),
                    priceUp  = (s._previousAttributes.decimalOdds > s.attributes.decimalOdds);

                var element = $("a[id*='-selection-"+s.id+"']"),
                    clazz   = (priceUp) ? "priceUp" : "priceDown";

                element.find('em').html(newOdds);
                element.addClass(clazz);

                // kill the anim after x milliseconds
                _.delay(function() { element.removeClass(clazz); }, 10000);
            },


            /**
             * @param route
             */
            onRouteChange: function(route){
                this.currentRoute = route;
            },


            /**
             * @returns {boolean}
             */
            isEventPage: function() {
                return (this.currentRoute.indexOf('/event/') != -1);
            }
        });
    });