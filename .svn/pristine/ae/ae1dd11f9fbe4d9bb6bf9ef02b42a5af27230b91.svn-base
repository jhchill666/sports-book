define(function () {
    return {

        /**
         * @param str
         * @param val
         * @returns {boolean}
         */
        sortOn: function(a, b, prop){
            var propA = a.get(prop),
                propB = b.get(prop);

            if (parseInt(propA) != NaN && parseInt(propB) != NaN)
            {
                propA = parseInt(propA);
                propB = parseInt(propB);
            }

            if (propA > propB) return 1;
            if (propA < propB) return -1;
            return 0;
        }

    };
});