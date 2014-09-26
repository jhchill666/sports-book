define(function () {
    return {

        /**
         * @param str
         * @param val
         * @returns {boolean}
         */
        isDev: function(str, val){
            var url = $(location).attr('href');
            return url.indexOf('localhost') != -1;
        },


        /**
         * Removes a query string from a location
         * @param location
         */
        removeQuery: function(location){
            return location.split('?')[0];
        },


        /**
         * Utility for processing a query string into json
         * object literal, ie. ?a=1&b=2 to {a:1, b:2}
         *
         * @param queryString
         */
        getQueryParams: function(queryString) {
            var query = (queryString || window.location.search).substring(1);
            if (!query) return false;

            return _
                .chain(query.split('&'))
                .map(function(params) {
                    var p = params.split('=');
                    return [p[0], decodeURIComponent(p[1])];
                })
                .object()
                .value();
        }
    };
});