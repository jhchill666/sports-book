define([
        'marionette',
        'text!app/view/main/competitions/CompetitionEventView.tpl.html'
    ],
    function(Marionette, tpl) {
        return Marionette.View.extend({


            dependencies: 'pm=competitionEventViewPM, vent',
            template: _.template(tpl),


            /**
             *
             */
            ready: function() {
                _.bindAll(this, 'onDataComplete', 'onPriceFormatChange');
                this.pm.on("onDataComplete",this.onDataComplete, this);
                this.vent.bind('globals:priceFormatChange', this.onPriceFormatChange);
            },


            /**
             *
             */
            onShow: function() {
                this.competitionId = this.options.competitionId;
                this.pm.getData(this.options);
            },


            /**
             * @param data
             */
            onDataComplete: function(data) {
                if (_.isUndefined(data) || !_.size(data.competitions))
                    return;

                //FIXME ADD COMPETITIONS ARRAY TO THE TEMPLATE.re3
                var competitions = data.competitions;
                var compId = parseInt(this.competitionId);
                var compName = null;
                // console.log('competitions event DP::::', this.displayParameters);
                _.each(competitions, function(comp){
                    _.each(comp.competition, function(compet){
                        if (compet.id == compId) {
                            compName = compet.name;
                        }
                    });
                });
                var args = {
                    compName: compName,
                    events : data.competitionEvents,
                    locale : App.globals.locale,
                    sport : App.globals.sport,
                    format: App.globals.priceFormat
                };

                this.$el.html(this.template(args));
            },


            /**
             * Handle price format changes - simply re-render the view
             */
            onPriceFormatChange: function() {
                var data = this.pm.getCompetitions();
                if (_.isUndefined(data)) return;
                this.onDataComplete(data);
            }
        });
    });
