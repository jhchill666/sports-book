/**
 * Created by Jamie on 18/09/2014.
 */
define(function (require) {
    var Marionette = require('marionette'),
        moment = require('moment');

    return Marionette.Controller.extend({
        callbacks: [],


        /**
         * Bind all public methods to this scope
         */
        initialize: function(options){
            this.options = options || {};
            this.milliseconds = this.options.milliseconds || 1000;
            _.bindAll(this, 'onInterval');
        },


        /**
         * @param func
         */
        addCallback: function(func, scope, args) {
            this.callbacks.push({func: func, scope: scope, args: args});
            return this;
        },


        /**
         * @param options
         */
        start: function() {
            this.interval = setInterval(this.onInterval, this.milliseconds);
        },


        /**
         *
         */
        stop: function() {
            clearInterval(this.interval);
        },


        /**
         *
         */
        onInterval: function() {
            _.each(this.callbacks, function(obj) {
                obj.func.apply(obj.scope, obj.args);
            }, this);
        }

    });
});


