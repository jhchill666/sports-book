define(['marionette'], function (Marionette) {
    return Marionette.Region.extend({

        /**
         * Rather than copying the html in the view, using a deep
         * clone on the child nodes will maintain events and data.
         */
        open: function(view) {
            view.$el.children().clone(true).appendTo(this.$el);
        }
    });
});