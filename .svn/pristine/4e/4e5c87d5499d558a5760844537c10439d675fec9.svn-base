define(['backbone'
],
function (Backbone) {
    return Backbone.Model.extend({
          
        defaults: {
            eventId : 0,
            sport:'',
            type:'',
            side:'',
            period:'',
            matchTimeInSecs:'',
            inplayAttributes: {
                SCORER:'',
                GOAL_TYPE:'',
                GOAL_SCORE:'0-0',
                SET_SCORE:'',
                GAME_SCORE:'',
                POINT_SCORE:'',
                PENALTY_SCORE:'',
                REDCARD_SCORE:'',
                YELLOWCARD_SCORE:'',
                CORNER_SCORE:''
            }
            
        },

        initialize: function(eventId) {
            this.set('eventId',eventId);
        },

        populate: function(data){
            var scope = this;
            _.each(data, function(val, key){
                if (key == 'id') scope.set('id', val);
                if (_.has(scope.defaults, key))
                    if (scope.attributes[key] != val) {
                        scope.set(key, val);
                    }    
            });
            
            if (_.has(data, 'attribute')) {
                var map = _.clone(scope.get("inplayAttributes"));
                var mapChanged = false;
                _.each(data.attribute, function(obj){
//                    if (_.has(map, obj.name)) {
//                        if (map[obj.name] != obj.value) {
                            map[obj.name] = obj.value;   
                            mapChanged = true;   
//                        }
//                    }
                });
                if (mapChanged)
                    this.set("inplayAttributes", map);
            }
        },


        /**
         * @param incidents
         */
        consolidate: function(incidents) {
            var attribs = {};
            var map = _.clone(this.get('inplayAttributes'));

            // sort all incidents chronologically
            _.sortBy(incidents, function(incident) {
                return incident.matchTimeInSecs;
            });

            for (var i = 0; i< incidents.length; i++) {
                var data = incidents[i];

                _.each(data, function(val, key){
                    if (_.has(this.attributes, key) && !_.isEmpty(val))
                        if (this.attributes[key] != val) {
                            attribs[key] = val;
                        }
                }, this);

                _.each(data.attribute, function(obj){
                    if (_.has(this.attributes.inplayAttributes, obj.name) && !_.isEmpty(obj.value)) {
                        if (this.attributes.inplayAttributes[obj.name] != obj.value) {
                            map[obj.name] = obj.value;
                        }
                    }
                }, this);
            }

            if (!!_.size(attribs)) {
                var defs = _.clone(this.attributes);
                this.set(_.extend(defs, attribs));
            }

            if (!!_.size(map))
                this.set({'inplayAttributes': map});
        },

        
        getGoalScore: function() {
            return this.get('inplayAttributes').GOAL_SCORE;
        }
    });
});