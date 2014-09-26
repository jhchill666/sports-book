define(['backbone'],
        function(Backbone) {
            return Backbone.Model.extend({


                dependencies: 'vent, model=marketGroupsModel, commands',
                markets: {},
                defaults: {
                    keyMarkets: null
                },


                /**
                 *
                 */
                ready: function() {
                    _.bindAll(this, 'onSportChange', 'hasMarkets');
                    this.vent.on('globals:sportChange', this.onSportChange);
                    this.onSportChange();
                },


                /*
                 var markets = {
                    football: {
                        match: {
                            displayOrder: 0,
                            types: ['OVUN', MRES', 'ETC']
                        }
                    }
                 };
                 */


                /**
                 * Parse all market types into objects for each market group
                 * @param templates
                 * @param sport
                 */
                parse: function(sport, markets) {

                    sport = sport.toLowerCase();
                    markets = markets || [];

                    // store markets and set as current if sport is same as global sport
                    this.markets[sport] = markets;
                    if (App.globals.sport == sport)
                        this.set('keyMarkets', this.markets[sport]);
                },


                /**
                 * Returns true if market group types have been loaded previously
                 * @param sport
                 * @returns {*}
                 */
                hasMarkets: function(sport) {
                    return _.has(this.markets, sport.toLowerCase());
                },


                /**
                 * Returns all market type codes for the specified market group and sport
                 * @param sport
                 */
                getMarkets: function(sport) {
                    sport = sport.toLowerCase() || App.globals.sport;

                    if (!_.has(this.markets, sport)) return [];
                    return this.markets[sport];
                },


                /**
                 * @param sport
                 */
                onSportChange: function(sport) {
                    sport = sport || App.globals.sport;

                    // if previously loaded, set as current
                    if (this.hasMarkets(sport))
                        this.set('keyMarkets', this.markets[sport]);

                    else {
                        // if we've not previously loaded key
                        // markets for this sport, do so
                        if (!this.model.hasTypes(sport))
                            this.commands.execute('command:getKeyMarketsForSport', sport);
                    }
                }
            });
        });
