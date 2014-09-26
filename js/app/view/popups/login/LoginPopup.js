define(['backbone', 
    'modal',
    'ctx',  
    'text!app/view/popups/login/LoginPopup.tpl.html'
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
             'click .close': 'closeModal',
        },

       /*
        *
        *
        */
         
        initialize: function(){
            _.bindAll(this, 'loginSuccess', 'loginFailure');
        },
        
        closeModal : function() {
	        this.close();
        },

        /**
         * Focus the username input
         */
         
        onOpened: function(){
            this.clear();
        },


        /**
         * Check both fields have been populated
         */
        beforeSubmit: function(e){
            this.user = $('input[name=username]').val();
            this.pass = $('input[name=password]').val();
            return $.trim(this.user).length > 0 && $.trim(this.pass).length > 0;
        },


        /**
         *
         */
        submit: function(e){
                
            this.commands.execute('command:login', this.user, this.pass)
                .done(this.loginSuccess)
                .fail(this.loginFailure);
        },


        /**
         *
         */
        clear: function(e){
            $('input[name=username]').val('');
            $('input[name=password]').val('');
            setTimeout(function(){
                $('input[name=username]').focus();
            }, 50);
         },
        
        /**
         * Login successful.  Close popup
         * @param e
         */
        loginSuccess: function(data, textStatus, jqXHR){
            var args = arguments;
            this.close();
        },
       

        /**
         * Login failed - show some feedback
         * @param e
         */
        loginFailure: function(jqXHR, textStatus, errorThrown){
            var args = Array.prototype.slice(arguments);
            var error = arguments[0].Error.value,
                feedback = $(this.el).find('#feedback');
            feedback.html(error);
        }
    });
});