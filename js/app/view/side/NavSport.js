/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/side/NavSport.tpl.html',
    'common/util/StringUtil',
],
function(Marionette, tpl, StringUtil) {
    return Marionette.View.extend({
        template: _.template(tpl),


        onShow: function() {
            //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.
            var args = {
                locale : App.globals.locale,
                sport : App.globals.sport,
                StringUtil: StringUtil
            };
            this.$el.html(this.template(args));
        }
    });
});
