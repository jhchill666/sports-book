define(['backbone'],
        function(Backbone) {
            return Backbone.Model.extend({


                dependencies: 'vent, model=marketGroupsModel, commands',
                groups: {},
                defaults: {
                    currentGroups: null
                },


                /**
                 *
                 */
                ready: function() {
                    _.bindAll(this, 'onSportChange', 'hasTypes');
                    this.vent.on('globals:sportChange', this.onSportChange);
                    this.onSportChange();
                },


                /*
                 var groups = {
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
                parse: function(templates, sport) {
                    var group, that = this;
                    sport = sport.toLowerCase();

                    if (!_.has(this.groups, sport))
                        this.groups[sport] = {};

                    _.each(templates, function(template) {
                        _.each(template.groups, function(g) {
                            if (_.has(that.groups[sport], g.code))
                                group = that.groups[sport][g.code];
                            else {
                                group = {name: g.code, displayOrder: g.displayOrder, types: [], count: 0};
                                that.groups[sport][g.code] = group;
                            }

                            if (!_.contains(group.types, template.type))
                                group.types.push(template.type);
                        })
                    });

                    // sort on displayOrder
                    _.sortBy(that.groups[sport], function(group) {
                        return group.displayOrder;
                    });

                    if (App.globals.sport == sport)
                        this.set('currentGroups', this.groups[sport]);
                },


                /**
                 * Counts the number of markets per market group
                 * that apply to the specified event
                 * @param event
                 */
                count: function(event) {
                    var group = this.groups[event.get('code')];
                    this.reset(group);

                    // iterates through all markets, incrementing the
                    // count in each market group that matches
                    _.each(event.Markets.models, function(m){
                        _.each(group, function(g) {
                            if (_.contains(group.types, market.get('type')))
                                group.count ++;
                        });
                    });

                    // filter out groups with zero matching types
                    return _.filter(group, function(g) {
                        return !!g.count;
                    });
                },


                /**
                 * Resets market count for specified group
                 * @param group
                 */
                reset: function(group) {
                    _.each(group, function(g) { g.count = 0; });
                },


                /**
                 * Returns true if market group types have been loaded previously
                 * @param sport
                 * @returns {*}
                 */
                hasTypes: function(sport) {
                    return _.has(this.groups, sport.toLowerCase());
                },


                /**
                 * Returns all market type codes for the specified market group and sport
                 * @param sport
                 */
                getTypes: function(sport, groupType) {
                    sport = sport.toLowerCase();

                    if (!_.has(this.groups, sport))
                        return [];

                    var sportGroup = this.groups[sport],
                        group = sportGroup[groupType];

                    return group.types;
                },


                /**
                 * @param sport
                 */
                onSportChange: function(sport) {
                    sport = sport || App.globals.sport;

                    // if previously loaded, set as current
                    if (this.hasTypes(sport))
                        this.set('currentGroups', _.value(this.groups[sport]));

                    else {
                        // if we've not previously loaded market
                        // group type for this sport, do so
                        if (!this.model.hasTypes(sport))
                            this.commands.execute('command:getSportDisplayTemplate', sport, 6, App.globals.locale);
                    }
                }
            });
        });
