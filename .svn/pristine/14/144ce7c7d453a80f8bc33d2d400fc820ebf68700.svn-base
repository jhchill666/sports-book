define(['marionette',
    'ctx',
    'text!app/view/AppView.tpl.html'
],
    function(Marionette, ctx, tpl) {

            return Marionette.LayoutView.extend({
                template: _.template(tpl),


                regions: {
                    "headerRegion": "#header-main",
                    "leftPanelRegion": "#content-side-panel-1",
                    "footerRegion": "#footer-main-panel",
                    "mainRegion" : "#content-main",
                    "rightPanelRegion" : "#content-side-panel-2"
                },


                /**
                 *
                 */
                initialize: function() {
                    this.pm = ctx.create('appViewPM', {el: this.el});
                },


                /**
                 *
                 */
                onShow: function() {
                    this.headerRegion.show(ctx.get('headerView'));
                    this.leftPanelRegion.show(ctx.get('leftPanelView'));
                    this.mainRegion.show(ctx.get('mainView'));
                    this.rightPanelRegion.show(ctx.get('rightPanelView'));
                    this.footerRegion.show(ctx.get('footerView'));


            }
        });
    });