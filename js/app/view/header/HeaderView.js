define([
        'marionette',
        'ctx',
        'text!app/view/header/HeaderView.tpl.html',
        'common/util/DateTimeUtil'
    ],
    function(Marionette, ctx, tpl, DateTimeUtil) {
        return Marionette.View.extend({

            dependencies: "schedule=eventScheduleModel, apiService, sessionModel, commands, vent",
            template: _.template(tpl),

            events: {
                'click .sign-in-cta .btn': 'login',
                'click .sign-in-cta .register': 'register',
                'click .user-account .logout': 'logout',
                'click .show-menu': 'openMenu',
                'click .price-format-min li a': 'onPriceFormatClick',
                'click .date-drop li a': 'dateChanged'
            },


            /**
             *
             */
            initialize: function(){
                this.modalEl = $('body').find('#modals');
            },


            /**
             * @param options
             */
            ready: function(options){
                _.bindAll(this, 'onLoginSuccess','onLoginFailure','onRequestLogin');
                this.schedule.on("updateComplete", this.onScheduleUpdateComplete, this);

                this.vent.on('router:routeChange', this.onRouteChange);
                this.vent.bind('session:requestLogin', this.onRequestLogin);
                this.vent.bind('session:loggedin', this.onLoginSuccess);
                this.vent.bind('session:loggedout', this.onLoginFailure);
            },


            /**
             *
             */
            onRouteChange: function() {
                var args = Array.prototype.slice.apply(arguments),
                    eventPage   = (args[0].indexOf('/event/') != -1),
                    showPeriods = (eventPage) ? 'hide' : 'show';
                $('.nav-main-container .date-drop')[showPeriods]();
            },


            /**
             *
             */
            onShow: function() {
                //FIXME ADD TRANSLATION UNDERSCORE SETTINGS.

                var args = {locale : App.globals.locale, sport : App.globals.sport};
                $(this.el).html(this.template(args));

                $('.show-menu').click(function() {
                    $('#all-menu').toggleClass('show');
                    $('.user').toggleClass('show');
                });

                $('.betslipToggle').click(function(event) {
                    $('.betslipToggle').toggleClass('show');
                    $('#content-side-panel-2').toggleClass('show');
                });
            },


            /**
             * @param event
             */
            onScheduleUpdateComplete: function(event) {
                var collection = this.schedule.getPrematchAndInplay();
                var days = [];

                _.each(collection.models, function(event) {
                    var eventTime = new Date(event.get('eventTime'));
                    var day = DateTimeUtil.groupingDayName(eventTime);

                    days[day] = day;
                });

                var template = _.template(tpl, {locale : App.globals.locale, sport : App.globals.sport, eventDates : days});
                this.$el.html(template);

                $('.show-menu').click(function() {
                    $('#all-menu').toggleClass('show');
                    $('.user').toggleClass('show');
                });

                $('.betslipToggle').click(function(event) {
                    $('.betslipToggle').toggleClass('show');
                    $('#content-side-panel-2').toggleClass('show');
                });

                $('.price-format-min').hover(function(){
                    $(this).addClass('hover');
                }, function() {
                    $(this).removeClass('hover');
                });

                if(this.sessionModel != undefined && this.sessionModel.isLoggedIn())
                {
                    var loggedInName = this.sessionModel.getName();
                    var balance = this.sessionModel.getCurrencySymbol() + this.sessionModel.getBalance();
                    $('#user-logged-in').show().find('.details').html(loggedInName + "<span>" + balance + "</span>");
                    $('#user-logged-out').hide();
                }
            },


            /**
             * @param e
             */
            onPriceFormatClick: function(e) {
                String.prototype.capitalize = function() {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                }

                var attrib = $(e.currentTarget).attr('id');
                var label = $(e.target).html();
                var newLbl = '';
                var current = App.globals.priceFormat;
                var thisEl = e.target;
                var oldLbl = App.globals.priceFormat.toLowerCase().capitalize();
                var oldId = $('li.morePrices > a').attr('id');


                switch (attrib) {
                    case "fractionalPrice":
                        App.globals.setFormat('FRACTION');
                        newLbl = 'Fraction <i class="fa fa-chevron-down"></i>';
                        break;
                    case "decimalPrice":
                        App.globals.setFormat('DECIMAL');
                        newLbl = 'Decimal <i class="fa fa-chevron-down"></i>';
                        break;
                    case "americanPrice":
                        App.globals.setFormat('AMERICAN');
                        newLbl = 'American <i class="fa fa-chevron-down"></i>';
                        break;
                    default:
                        break;
                }


                if (current != App.globals.priceFormat) {
                    $(e.target).html(oldLbl);
                    $(e.target).attr('id', oldId);
                    $('li.morePrices > a').attr('id', attrib).html(newLbl);
                }

                $('.price-format-min').removeClass('hover');

            },


            /**
             * @param e
             */
            dateChanged: function(e) {
                $('.date-drop li a').removeClass('active');
                $(e.currentTarget).addClass('active');
                var day = $(e.currentTarget).attr('id');
            },

            logout: function(event) {
                this.commands.execute('command:logout');
            },

            openMenu: function() {
                $('#menu').css("display","block");
            },

            login: function() {
                var popup = ctx.get('loginPopup');
                $(this.modalEl).attr('class', '');
                $(this.modalEl).addClass('loginPop');
                $(this.modalEl).html(popup.render().el);
            },

            register: function(e) {
                var regPop = ctx.get('registerPopup');
                $(this.modalEl).attr('class', '');
                $(this.modalEl).addClass('registerPop');
                $(this.modalEl).html(regPop.render().el);
            },

            onRequestLogin: function() {
                this.login();
            },

            onLoginSuccess: function() {
                var loggedInName = this.sessionModel.getName();
                var balance = this.sessionModel.getCurrencySymbol() + this.sessionModel.getBalance();
                $('#user-logged-in').show().find('.details').html(loggedInName + "<span>" + balance + "</span>");
                $('#user-logged-out').hide();
            },

            onLoginFailure: function() {
                $('#user-logged-in').hide();
                $('#user-logged-out').show();
            }



        });
    });
