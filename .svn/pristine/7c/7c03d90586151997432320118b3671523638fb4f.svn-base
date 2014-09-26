define(['backbone', 
    'modal',
    'ctx',  
    'text!app/view/popups/message/MessagePopup.tpl.html'
],
function (Backbone, Modal, ctx, tpl) {
    return Backbone.Modal.extend({
        
        template: _.template(tpl),

        dependencies: 'commands',
        submitEl: '.submit',
        clearEl: '.clear',
       // cancelEl: '.close',
        clickOutsideEnabled: false,
        regionEnabled: true,

        events: {
             'click .close': 'closeModal'
        },

       /*
        *
        *
        */
         
        initialize: function(){
            _.bindAll(this, 'closeModal', 'onOpened', 'submit');
        },


        /**
         *
         */
        closeModal : function() {
	        this.close();
        },


        /**
         *
         */
        onOpened: function(){
//            this.clear();
        },


        /**
         *
         */
        submit: function(e){
                
            this.close();
        }


    });
});