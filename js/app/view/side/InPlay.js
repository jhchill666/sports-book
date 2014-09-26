/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'marionette',
    'text!app/view/side/InPlay.tpl.html'
],
function(Marionette, tpl) {
    return Marionette.View.extend({
        dependencies: 'commands, eventSchedulePM',
        template: _.template(tpl),


        /**
         *
         */
        ready: function() {
            this.pm = this.eventSchedulePM;
            this.pm.on("onInplayDataComplate",this.onInplayDataComplate, this);
            this.pm.on("onInplayIncidentChange",this.onInplayIncidentChange, this);
            this.pm.on("onParticipantChange",this.onParticipantChange, this);
        },


        /**
         *
         */
        onShow: function() {
            var events = this.pm.schedule.getInplay();
            this.onInplayDataComplate(events);
        },


        /**
         * @param event
         */
        onParticipantChange: function(event) {
            var eventId = event.id;
            $('#'+'sidebar-left-inplay-participant-a-'+eventId).html(event.getParticipantA());
            $('#'+'sidebar-left-inplay-participant-b-'+eventId).html(event.getParticipantB());
        },


        /**
         * @param inplayEvents
         */
        onInplayDataComplate: function(inplayEvents){
            var args = {
                locale : this.options.locale,
                sport : this.options.sport,
                events: inplayEvents
            };

            var eventIds = _.map(inplayEvents, function(event){
                return event.id;
            });

            if (_.isEmpty(eventIds)) return;

            this.commands.execute('command:subscribe:events', App.globals.sport, eventIds.join(','));
            this.$el.html(this.template(args));
        },


        /**
         * @param incident
         */
        onInplayIncidentChange: function(incident){
            var eventId = incident.attributes.eventId;
            
            if (incident.getGoalScore().indexOf('-') > -1) {
	            var score = incident.getGoalScore().split("-");
            } else if (incident.getGoalScore().indexOf(':') > -1) {
	            var score = incident.getGoalScore().split(":");
            }
            
	        $('#'+'sidebar-left-inplay-score-a-'+eventId).html(score[0]);
			$('#'+'sidebar-left-inplay-score-b-'+eventId).html(score[1]);
           
        }
    });
});

