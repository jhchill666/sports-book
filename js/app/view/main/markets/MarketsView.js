define([
    'marionette',
    'ctx',
    'common/util/MomentUtil',
    'text!app/view/main/markets/MarketsView.tpl.html'
],
        function(Marionette, ctx, MomentUtil, tpl) {
            return Marionette.View.extend({


                dependencies: 'pm=marketsViewPM, vent, model=eventDetailsModel, groupsModel=marketGroupsModel',
                template: _.template(tpl),
                filterTypes: [],


                /**
                 *
                 */
                ready: function() {
                    _.bindAll(this, 'onDataComplete', 'onPriceFormatChange', 'onFilterByMarketType');
                    this.pm.on("onDataComplete", this.onDataComplete, this);
                    this.vent.on('globals:priceFormatChange', this.onPriceFormatChange);
                    this.vent.on('marketGroup:filter', this.onFilterByMarketType);
                },


                /**
                 *
                 */
                onShow: function() {
                    this.filterTypes = [];
                    this.pm.getData(this.options);
                },


                /**
                 * @param event
                 */
                onDataComplete: function(event) {
                    if (_.isUndefined(event) || _.isNull(event)) return;

                    this.initializeClock(event);
                    this.$el.html(this.template({event: event, format: App.globals.priceFormat, marketTypes: this.filterTypes }));

                    $('.price a').hover(function() {
                        var price = $(this).find('i');
                        if ($(price)[0].scrollWidth > $(price).innerWidth()) {
                            console.log("overflown");
                            $('.price a').addClass('tooltip');
                        }
                        else {
                            $('.price a').removeClass('tooltip');
                        }
                    });
                },


                /**
                 * Handle price format changes - simply re-render the view
                 */
                onPriceFormatChange: function() {
                    this.onDataComplete(this.model.getEventDetails());
                },


                /**
                 * @param filterObj
                 */
                onFilterByMarketType: function(group) {
                    this.filterTypes = this.groupsModel.getTypes(App.globals.sport, group);
                    this.onDataComplete(this.model.getEventDetails());
                },


                /**
                 * @param event
                 */
                initializeClock: function(event) {
                    if (this.clock) return;

                    var clock = event.get('genericInplayAttribs').clock,
                        startTime = MomentUtil.fromDisplay(clock);

                    this.clock = ctx.create('clock', {milliseconds: 1000});
                    this.clock.addCallback(function() {

                        // set the time
                        var time = moment().subtract(startTime);
                        $('.time span').text(time.format('mm:ss'));

                        // update the game percent
                        var percent = (time.get('minutes') / 100) * 90;
                        $('.progressBar .activeBar').css({'width': percent+'%'});

                    }, this).start();
                },


                /**
                 * Clean up the clock onDestroy
                 */
                onDestroy: function() {
                    if (_.isUndefined(this.clock)) return;

                    this.clock.stop();
                    delete this.clock;
                }
            });
        });