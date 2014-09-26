/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/side/ContentSidePanelView.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({
                template: _.template(tpl),


                onShow: function() {

                    //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.
                    var args = {locale: App.globals.locale};
                    this.$el.html(this.template(args));

                }

            });
        });

