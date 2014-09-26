/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/inplay/BasketballScoreboard.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({

				dependencies: 'vent, eventScheduleModel',
                eventIdInplay:0,
                event:null,
                
                onShow: function() {
                    //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.
                    
                    this.eventIdInplay = this.options.eventId;
                    this.event = this.eventScheduleModel.findEventById(this.eventIdInplay);
                    
                    var template = _.template(tpl, {});
                   // this.$el.html(template);
                }

            });
        });

