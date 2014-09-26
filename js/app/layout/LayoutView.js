define([
    'marionette',
    'ctx'
],
        function(Marionette, ctx) {
            return Marionette.LayoutView.extend({
                template: _.template('<ul></ul>'),
                
                regions: {
                },
                
                onShow: function() {

                },
                
                redraw: function(modules, parameters) {
                	
                	this.regionManager.removeRegions();
                	
                    var that = this;
                    
                    var newTemplate = '<ul>';
                    _.each(modules, function(val, key) {
                        newTemplate = newTemplate + '<li id="' + val + '"></li>';
                    });
                    newTemplate = newTemplate + '</ul>';

                    this.template = _.template(newTemplate);

                    _.each(modules, function(val, key) {
                        that.addRegion(key, "#" + val);
                    });
                    that.render();

                    _.each(modules, function(val, key) {
                        //This gets the Views defined in AppConfig
                    	ctx.get(key).displayParameters = parameters;
                        that[key].show(ctx.get(key));
                    });
                	
                }


            });
        });