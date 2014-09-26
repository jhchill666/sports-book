define([
    'marionette',
    'text!app/view/main/markets/MarketGroups.tpl.html'
],
        function(Marionette, tpl) {
            return Marionette.View.extend({


                dependencies: 'model=marketGroupsModel, vent',
                template: _.template(tpl),


                events: {
                    'click ul li a': 'onMarketGroupClick'
                },


                /**
                 * @param options
                 */
                ready: function(options) {
                    _.bindAll(this, 'onGroupsChange', 'onMarketGroupClick');
                    this.model.on('change:currentGroups', this.onGroupsChange);
                },


                /**
                 *
                 */
                onShow: function() {
                    var groups = this.model.get('currentGroups'),
                        that = this;

                    if (_.isUndefined(groups)) return;
                    this.$el.html(this.template({groups: groups}));

                    if ($('.nav-pills li a').length > 0) {
                        $('.nav-pills li a').unbind('click').click(function(e) {
                            that.onMarketGroupClick(e);
                        });
                    }
                },


                /**
                 * @param event
                 */
                onMarketGroupClick: function(event) {
                    var marketGroupType = $(event.target).attr('marketGroupType');
                    this.vent.trigger('marketGroup:filter', marketGroupType);

					$('.nav-pills li').removeClass('active');
					$(event.target).parent('li').addClass('active');
                },


                /*
                 {
                    match: {
                        displayOrder: 0,
                        types: ['OVUN', MRES', 'ETC']
                    }
                 }
                 */

                /**
                 * @param marketGroups
                 */
                onGroupsChange: function() {
                    this.onShow();
                }
            });
        });

        