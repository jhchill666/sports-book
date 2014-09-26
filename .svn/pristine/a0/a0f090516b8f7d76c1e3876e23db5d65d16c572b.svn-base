/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/main/competitions/CompetitionsView.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({

                dependencies:'schedule=eventScheduleModel',
                template: _.template(tpl),


                /**
                 * @param options
                 */
                ready: function(options) {
                    this.schedule.on("change:competitions", this.onCompetitionsDataComplete, this);
                },


                /**
                 * @param event
                 */
                onCompetitionsDataComplete: function(event) {
                    var data = event.attributes.competitions;
                    var args = {
	                    competitions : data,
	                    sport : App.globals.sport,
	                    locale : App.globals.locale
                    };
                   
                    this.$el.html(this.template(args));
                }
            });
        });

