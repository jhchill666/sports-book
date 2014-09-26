define(['underscore', 'backbone'],
function(_, Backbone) {
    return Backbone.Model.extend({

        methodMap: {
            'POST'      : 'create',
            'PUT'       : 'update',
            'DELETE'    : 'delete',
            'GETJSON'   : 'read',
            'GET'       : 'read'
        },

        headerMap: {
            'GETJSON'   : { 'Accept': 'text/x-json' }
        },


        /**
         *
         * Targets object should be an object of service method object definitions.
         *
         * Each definition, should have the actual remote service method name as it's key,
         * and an options objects as follows:
         *
         * The options can comprise of all/any of the following two option definitions:
         *
         * 1) 'method' - the service method type.  Can be any of the values above from the methodMap object.  If a 'method' hash is not provided, 'get' is used as default. Case-unsensitive. ie:
         *
         * targets: {
         *  'someServiceMethod': {
         *      'method': 'post'
         *  }
         * }
         *
         * 2) 'args' - arguments for the method call.  Should be an array of argument definitions.  An argument definition should either be:
         *  a) A String, specifying the remote argument name, and denoting a required argument that should always be provided
         *  b) An object containing the argument name as key, and the argument's default value, if not explicitly provided by user.
         *  c) An object containing the argument name as key, and another object, with key 'attr' and name of an attribute on the model to retrieve the value
         *
         * defaults: {
         *  sessionToken: function(){
         *      return this.session.getSessionToken();
         *  },
         * }
         *
         * targets: {
         *  'someServiceMethod': {
         *      'method': 'post',
         *      args: [
         *          'firstRequiredArgument',                    // required argument must be applied to function invocation (see a)
         *          {'secondArgument': 'defaultValue'}          // non-required argument, has default value specified (see b)
         *          {'thirdArgument': { attr: 'sessionToken'}}  // non-required argument, use implicit value (see c)
         *      ]
         *  }
         * }
         *
         *
         * The arguments array, should match exactly the order or arguments supplied to the method, when providing user defined values.
         * Any number of unrequired methods may be stipulated as null or undefined or '' to prevent the default value being overriden.
         */


        /**
         * @param options
         */
        initialize: function(options){
            this.targetsObjs = this.parseTargets(this.targets || {});
            _.bindAll(this, 'createMethod');
            _.each(this.targetsObjs, this.createMethod, this);
        },


        /**
         * Crete a target object for each provided target method
         */
        parseTargets: function(targets){
            return _.map(targets, function (options, request) {
                var target = { request: request, method: "get", args:[] };

                // if is string, the options should only be a method type such as 'POST'
                if (_.isString(options) && !_.blank(options))
                    target.method = options.toUpperCase();

                // if is an array, assumed to be an array of required arguments names
                if (_.isArray(options))
                    target.args = options;

                // if is a json object, just extend the target object with new values
                if (_.isObject(options))
                    _.extend(target, options);

                target.method = target.method.toUpperCase();
                return target;
            });
        },


        /**
         * Create the actual targets' method on this service.
         *
         * Calling the method returns a JQuery Promise object.  This provides a subset
         * of the callback methods of the Deferred object (then, done, fail, always,
         * pipe, and state).  This enables multiple ways of responding to a promises
         * response.
         *
         * For example:
         *
         *  var promise = this.api.login('jamie', 'password');
         *
         *  promise.done(function(resp){
         *      // do something with the success response
         *  });
         *
         *  promise.fail(function(resp){
         *      // do something with the failure response
         *  });
         *
         *  promise.always(function(resp){
         *      // always do something regardless of outcome
         *  });
         *
         * You can also use the 'ten' shorthand for adding the previous callbacks in one go:
         *
         *  promise.then(doneCallback, failCallback, alwaysCallback);
         *
         * @param target
         */
        createMethod: function (target) {
            var scope = this;
            this[target.request] = function () {
                var deferred     = $.Deferred(),
                    options      = scope.createOptions(target, arguments, deferred),
                    method       = scope.methodMap[target.method];
                Backbone.sync(method, scope, options);
                return deferred.promise(scope);
            }
        },


        /**
         * @param target
         * @param data
         * @param deferred
         * @returns {{url: string, data: *, success: success, error: error}}
         */
        createOptions: function(target, data, deferred){
            var options = this.addHeaders({
                url     : this.url.replace(/\/$/, "") + '/' + target.request,
                data    : this.getParams(target, data),
                success : function (data, status, xhr) {
                    var action = _.has(data, 'Error') ?
                        'reject' : 'resolve';
                    deferred[action](data);
                },
                error   : function (xhr, status, err) {
//                    deferred.reject(err);
                }
            }, target.method);

            if (target.method == 'GETJSON')
                _.extend(options, {dataType: 'json'});

            return options;
        },


        /**
         * Returns a resolved params object, with all required parameters added
         * @param args
         * @param data
         */
        getParams: function(target, data){
            var params = {}, that = this;

            // iterate through each argument
            _.each(target.args, function(arg, index){

                // if it's a string, it's an expected arg, so take it from the data array
                if (_.isString(arg)){
                    params[arg] = data[index];
                }

                // if it's an object, it's either been set with a default value, or an
                // implicit value.  Should set the default/implicit, before applying user value
                else if (_.isObject(arg)) {
                    var keyValue = _.pairs(arg)[0];

                    // the argument value is an 'attr' type object, which denotes an implicit value.
                    if (_.isObject(keyValue[1]) && _.has(keyValue[1], 'attr')){
                        // get and set the implicit value
                        params[keyValue[0]] = that.get(keyValue[1].attr);
                    }
                    // otherwise it's simply a default value as should be set as the
                    // default, before any user provided value is applied.
                    else {
                        params[keyValue[0]] = keyValue[1];

                        // is a user defined value, so apply it.
                        if (data.length >= index && !_.isUndefined(data[index]))
                            params[keyValue[0]] = data[index];
                    }
                }
            });

            return $.param(params);
        },

        /**
         * Extends the target options to include any default headers for the request method type
         * @param options
         * @param method
         * @returns {*}
         */
        addHeaders: function(options, method){
            var headers = this.headerMap[method];
            if (headers)
                _.extend(options, { headers: headers });
            return options;
        },


        /**
         * Extends the backbone 'get' method to return invoked function calls for model attributes:
         *
         * defaults: {
         *  robotSays: function(){
         *      return "Beep Beep";
         *  }
         * }
         *
         * this.get('robotSays') >  'Beep Beep'
         *
         * @param attr
         * @returns {*}
         */
        get: function(attr) {
            var value = Backbone.Model.prototype.get.call(this, attr);
            return _.isFunction(value) ? value.call(this) : value;
        }
    });
});