define(['ctx'], function (ctx){
    return function(username, password){
        console.log('Command: command:recoverlogin');

        var service = ctx.get('apiService'),
            model = ctx.get('sessionModel');

        service.login(username, password);
    }
});