define(['marionette','common/bootstrap/core/DeferredBase'],
    function(Marionette, DeferredBase) {

    return DeferredBase.extend({
        name: 'Bootstrap',


        /**
         * Override to add defered functionality
         */
        init: function(){
            _.bindAll(this, 'next', 'fail', 'finish');
            this.sequence = this.options.boot || [];
            this.failOnError = this.options.failOnError || true;
            this.next();
        },


        /**
         * Performs the next deffered in the sequence
         */
        next: function(){
            if (_.size(this.sequence) == 0) {
                this.finish();
            } else {
                var model = new (this.sequence.shift())(this.options),
                    scope = this;
                $.when(model.deferred)
                    .then(scope.next, scope.fail);
            }
        },


        /**
         * Handles failure of the deferred promise.  If 'failOnError' is true, the
         * sequence is terminated.  If false, next deferred instance in sequence is invoked.
         */
        fail: function(){
            if (this.failOnError)
                console.log('Bootstrap: Failed');
            else this.next();

        },


        /**
         * The sequence has completed
         */
        finish: function(){
            console.log('Bootstrap: Success');
            this.deferred.resolve(arguments);
        }

    });
});