/**
 * Created by Jamie on 18/09/2014.
 */
define(function () {
    return {

        /**
         * @param str
         * @param val
         * @returns {boolean}
         */
        extract: function(selector){
            var index = selector.lastIndexOf('-'),
                id    = (index != -1) ? selector.substr(index + 1) : '';
            return id;
        }

    };
});