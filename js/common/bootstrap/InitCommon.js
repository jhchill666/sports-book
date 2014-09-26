define(function(require) {
    var DeferredBase = require('common/bootstrap/core/DeferredBase');
    return DeferredBase.extend({
        name: 'InitCommon',

        init: function(){
            App.models = require('app/model/models');
            App.util = require('common/util/util');
            App.services = require('common/service/services');

            console.log('App.models: '+JSON.stringify(App.models));
            console.log('App.util: '+JSON.stringify(App.util));
            console.log('App.service: '+JSON.stringify(App.services));

            this.success();
        }
    });
});