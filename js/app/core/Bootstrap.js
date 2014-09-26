define([
    'backbone',
    'ctx',
    'common/bootstrap/core/bootstrap',
    'common/bootstrap/UrlResolver',
    'app/core/ServicesConfig',
    'app/core/FrameworkConfig',
    'app/core/AppConfig'
],
function(Backbone, ctx, Bootstrap, UrlResolver, ServicesConfig, FrameworkConfig, AppConfig) {
    return Bootstrap.extend({

        /**
         * Array of Deferrable Boot sequence objects to invoke
         */
        bootSequence: [
            UrlResolver,
            ServicesConfig,
            FrameworkConfig,
            AppConfig
        ],


        /**
         * Initialize the bootstrap sequence
         * @param options
         */
        initialize:function (options) {
            this.options = _.extend({}, options, {
                boot: this.bootSequence,
                failOnError: false
            });
            Bootstrap.prototype.initialize(this.options);
        }
    });
});