define([
    'marionette',
    'text!app/view/main/coupons/CouponsView.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({
                
                dependencies: 'schedule=eventScheduleModel',
                template: _.template(tpl),


                ready: function(options) {
                    this.schedule.on("change:coupons",this.onCouponsDataComplete, this);
                },
                
                onCouponsDataComplete: function(event) {
                    var data = event.attributes.coupons;
                    
                   
                    var args = {
                    	coupons : data,
                    	sport : App.globals.sport,
	                    locale : App.globals.locale
                    };
                    this.$el.html(this.template(args));
                }

            });
        });
