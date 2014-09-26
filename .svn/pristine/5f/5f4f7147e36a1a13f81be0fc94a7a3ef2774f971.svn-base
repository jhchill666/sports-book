define([
    'marionette',
    'text!app/view/main/countries/CountriesEventView.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({


                dependencies: 'schedule=eventScheduleModel, vent',
                template: _.template(tpl),


                /**
                 *
                 */
                ready: function() {
                    _.bindAll(this, 'onDataComplete', 'onPriceFormatChange');
                    this.vent.bind('globals:priceFormatChange', this.onPriceFormatChange);
                    this.schedule.on("change:competitions", this.onDataComplete);
                },


                /**
                 *
                 */
                onShow: function() {
                    this.onDataComplete(this.schedule.getCompetitions());
                },


                /**
                 * @param data
                 */
                onDataComplete: function(data) {
                    if (_.isEmpty(data)) return;
                
                    var competitions = _.isArray(data) ? data : data.attributes.competitions,
                        country = _.findWhere(competitions, {id: parseInt(this.options.countryId)}),
                            args = {
                            locale : this.options.locale,
                            sport : this.options.sport,
                            country: country,
                            format: App.globals.priceFormat
                        };

                    if (_.isUndefined(country)) return;
                    this.$el.html(this.template(args));
                },


                /**
                 * Handle price format changes - simply re-render the view
                 */
                onPriceFormatChange: function() {
                    this.onShow();
                }
            });
        });