define(['marionette',
    'app/model/Event',
    'app/model/Market'
],
        function(Marionette, Event, Market) {

            return Marionette.Controller.extend({
                dependencies: 'schedule=eventScheduleModel, commands, vent',
                
                ready: function(options) {
                    this.schedule.on("change:couponsEvents", this.onCouponsEventsChange, this);
                },
                
                getData: function(options) {
                    var couponId = options.couponId;
                    var locale = App.globals.locale;
                    
                    this.commands.execute('command:getCouponEvents', couponId, 6, locale )
                        .done(this.onCouponsEventSuccess)
                        .fail(this.onCouponsEventFailure);
                },
                
                onCouponsEventSuccess: function(data, textStatus, jqXHR) {
                },
                
                onCouponsEventFailure: function(data, textStatus, jqXHR) {
                    //Add logic for no data returned.
                },
                
                onCouponsEventsChange: function(model) {
                    //Parsed Event model data.
                    this.trigger("onDataComplete", model.attributes.couponEvents);
                }
                
               

            });
        });