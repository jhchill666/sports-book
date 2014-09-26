/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

requirejs.config({

	baseUrl: "./js",
	waitSeconds: 20,
	
    paths: {
        'jquery'                : 'libs/jquery/dist/jquery',
        'underscore'            : 'libs/underscore/underscore',
        'backbone'              : 'libs/backbone/backbone',
        'marionette'            : 'libs/marionette/lib/backbone.marionette',
        'backbone.wreqr'        : 'libs/backbone.wreqr/lib/backbone.wreqr',
        'backbone.command'      : 'common/framework/command/Backbone.Command',
        'modal'                 : 'libs/backbone.modal',
        'text'                  : 'libs/requirejs-text/text',
        'moment'                : 'libs/moment/moment',
        'di'                    : 'libs/di-lite/di-lite',
        'ctx'                   : 'app/core/ctx',
        'app'                   : 'app',
        'cookie'                : 'common/util/CookieUtil',
        'easing'                : 'libs/jquery.easing/js/jquery.easing',
        'betSelection'          : 'app/model/bets/BetSelection',
        'betTypeCalculator'     : 'app/model/bets/BetTypeCalculator',
        'betJsonGenerator'      : 'app/model/bets/BetJsonGenerator',
        'betsSummary'           : 'app/model/bets/BetsSummary',
        'betPart'               : 'app/model/bets/BetPart',
        'singleBet'             : 'app/model/bets/SingleBet',
        'systemBet'             : 'app/model/bets/SystemBet',
        'bet'                   : 'app/model/bets/Bet'
        
    },

    shim : {
        'di'                    : { exports: 'di' },
        'ctx'                   : { exports: 'ctx' },
        'backbone'              : { exports: 'Backbone', deps: ['underscore', 'jquery'] },
        'marionette'            : { exports: 'Marionette', deps: ['underscore', 'backbone', 'jquery'] },
        'backbone.wreqr'        : { exports: 'Wreqr', deps: ['marionette'] },
        'backbone.command'      : { exports: 'Command', deps: ['marionette'] },
        'modal'                 : { exports: 'Modal', deps: ['underscore', 'backbone', 'jquery'] },
        'underscore'            : { exports: '_' },
        'moment'                : { exports : 'moment' },
        'cookie'                : { exports: 'cookie' },
        'easing'                : { exports: 'easing' },
        'betSelection'          : { exports: 'BetSelection' },
        'betTypeCalculator'     : { exports: 'BetTypeCalculator' },
        'betJsonGenerator'      : { exports: 'BetJsonGenerator' },
        'betsSummary'           : { exports: 'BetsSummary' },
        'betPart'               : { exports: 'BetPart' },
        'singleBet'             : { exports: 'SingleBet' },
        'systemBet'             : { exports: 'SystemBet' },
        'bet'                   : { exports: 'Bet' }
        
	}

});

require(['app'], function(app){
    App.start();
})