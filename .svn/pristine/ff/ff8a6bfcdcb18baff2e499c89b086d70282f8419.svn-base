define(['backbone.command', 'ctx'], function (Command, ctx){
    return Command.extend({

        execute: function( couponId, channelId, locale ){
            var service = ctx.get('apiService');
            return service.getCouponEvents( couponId, channelId, locale  );
        },

        /**
         * @param resp
         */
        success: function(resp){
            if (_.has(resp, 'Coupon')){
                var model = ctx.get('eventScheduleModel');
                model.setCouponEvents(resp.Coupon.competitions);
            }
        }
        
        
    });
});


