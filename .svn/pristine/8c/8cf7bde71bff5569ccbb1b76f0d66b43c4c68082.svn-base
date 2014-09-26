/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/side/CurrentSport.tpl.html',
    'common/util/StringUtil',
],
function(Marionette, tpl, StringUtil) {
    return Marionette.View.extend({
        template: _.template(tpl),


        onShow: function() {
            //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.

            var args = {
                locale : this.options.locale,
                sport : this.options.sport,
                StringUtil: StringUtil
            };
            this.$el.html(this.template(args));
        }
    });
});

