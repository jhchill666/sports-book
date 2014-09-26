/**
 * Created by Jamie on 10/09/2014.
 */
define(function (require) {
    var Marionette = require('marionette'),
        ctx = require('ctx');

    return Marionette.Object.extend({


        locale: '',
        sport: '',
        priceFormat: '',
        singleViews: true,


        // defaults
        defaultSport: 'soccer',
        defaultLocale: 'en-us',
        defaultFormat: 'FRACTION',


        /**
         * Sets the default values
         */
        initialize: function(options){
            this.vent = options.vent;
            this.setLocale(this.defaultLocale);
            this.setSport(this.defaultSport);
            this.setFormat(this.defaultFormat);
        },


        /**
         * Sets the current locale. If no argument provided sets the default
         * @param locale
         */
        setLocale: function(locale) {
            locale = locale || this.defaultLocale;
            this._set('locale', locale.toLowerCase());
        },


        /**
         * Sets the current sport. If no argument provided sets the default
         * @param locale
         */
        setSport: function(sport) {
            sport = sport || this.defaultSport;
            this._set('sport', sport.toLowerCase());
        },


        /**
         * Sets the current price format. If no argument provided sets the default
         * @param format
         */
        setFormat: function(format) {
            format = format || this.defaultFormat
            this._set('priceFormat', format.toUpperCase());
        },


        /**
         * @returns {{locale: *, sport: *}}
         */
        get: function() {
            return {locale: this.locale, sport: this.sport};
        },


        /**
         * Internal set method
         * @param key
         * @param val
         * @private
         */
        _set: function(key, val) {
            if (this[key] !== val) {
                this[key] = val;
                this.vent.trigger('globals:'+key+'Change', val);
            }
        }
    });
});


