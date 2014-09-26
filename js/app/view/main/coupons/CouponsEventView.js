define([
    'marionette',
    'text!app/view/main/coupons/CouponsEventView.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({


                dependencies: 'couponsEventViewPM',
                template: _.template(tpl),


                ready: function() {
                    this.pm = this.couponsEventViewPM;
                    this.pm.on("onDataComplete",this.onDataComplete, this);
                },
                
                onDataComplete: function(coupons) {
                    //FIXME ADD COMPETITIONS ARRAY TO THE TEMPLATE.
                    //var template = _.template(tpl, {schedule : schedule, locale : this.options.locale, sport : this.options.sport});
                    //this.$el.html(template);
                },
                
                onShow: function() {
                    this.pm.getData(this.options);
                }
                
                
            });
        });