define([
    'marionette',
    'text!app/view/side/CountriesView.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({
                
                dependencies: 'schedule=eventScheduleModel',
                template: _.template(tpl),


                /**
                 * @param options
                 */
                ready: function(options) {
                    this.schedule.on("change:competitions", this.onDataComplete, this);
                },


                /**
                 *
                 */
                onShow: function() {
                    this.onDataComplete(this.schedule.getCompetitions());
                },


                /**
                 * @param event
                 */
                onDataComplete: function(data) {
                    if (_.isEmpty(data)) return;

                    var competitions = _.isArray(data) ? data : data.attributes.competitions;
                    var args = {
                        locale : App.globals.locale,
                        sport : App.globals.sport,
                        countries: _.sortBy(competitions, function(s){ 
					    	return s.name;
                        })
                    };
		    
                    this.$el.html(this.template(args));
                }
            });
        });