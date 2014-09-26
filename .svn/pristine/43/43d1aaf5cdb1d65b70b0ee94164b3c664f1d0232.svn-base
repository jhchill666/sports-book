/**
 * Created by Jamie on 05/09/2014.
 */
define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        /**
         * Executes the correct subscription method, applying the supplied arguments
         * @param type
         */
        execute: function(type){
            var args    = Array.prototype.slice.apply(arguments),
                ctrl    = ctx.get('subsController'),
                method = this.getType();
            ctrl[method].apply(ctrl, args);
        },


        /**
         * Parse which subscription type to use
         * @param arg
         * @returns {string}
         */
        getType: function() {
            // splits the command identifier as specified in ServicesConfig,
            // to retrieve the subscription type for the command invokation
            var type    = this.name.split(':').pop();
            var method  = 'subscribeToSchedule';

            switch(type){
                case 'eventDetails':
                    method = 'subscribeToEventDetails';
                    break;
                case 'events':
                    method = 'subscribeToEventsAndSchedule';
                    break;
                case 'markets':
                    method = 'subscribeToMarketsAndSchedule';
                    break;
            }
            return method;
        }

    });
});