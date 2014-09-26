/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/side/Competitions.tpl.html'
],
function(Marionette, tpl) {

    var Collection = Backbone.Collection.extend({
        model: Event
    });


    var PM = Marionette.View.extend({


        dependencies: 'model=scheduleModel',
        collection: new Collection(),


        /**
         * @param options
         */
        getData: function(options) {
            var schedule = this.model.getSchedule(options.sport);
            if (schedule)
                this.collection = schedule.getCompetitions();
        }



//        dependencies: 'pm=competitionsPM',
//        template: _.template(tpl),
//
//
//        /**
//         *
//         */
//        ready: function() {
//            this.pm.on("onCompetitionsDataComplate", this.onDataComplete, this);
//        },
//
//
//        /**
//         *
//         */
//        onShow: function() {
//            this.onDataComplete(this.pm.schedule.getCompetitions());
//        },
//
//
//        /**
//         * @param competitions
//         */
//        onDataComplete: function(competitions){
//            var args ={
//                locale : this.options.locale,
//                sport : this.options.sport,
//            	competitions: _.sortBy(_.flatten(_.pluck(competitions, 'competition'), true), function(s){
//			    	return s.name.charCodeAt() * -1;
//				}).reverse()
//		    };
//
//            if (_.isEmpty(competitions)) return;
//            this.$el.html(this.template(args));
//        }

    });

    return PM;
});

 