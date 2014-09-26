define(['backbone'],
function (Backbone) {
    return Backbone.Model.extend({


        dependencies: 'vent',
        defaults: {
            name: '-',
            accountId: '-',
            username: '-',
            password: '-',
            sessionToken: '-',
            accountBalance: {
                value: '0',
                currency: '£'
            }
        },



        /**
         * Once dependencies have been satisfied, do a 'recovery'
         * to get current authenticated status, thereby launching
         * login popup should a valid session not be available
         */
        ready: function(){
            this.recoverSession();
        },

        /**
         * @returns {boolean}
         */
        isLoggedIn: function() {
            return this.store.check('session');
        },
        
        isNotLoggedIn: function() {
            return !this.isLoggedIn();
        },


        /**
         * @param lgn
         */
        storeSession: function(lgn){
            this.set(lgn);
            this.store.update(this);
            this.vent.trigger('session:loggedin', lgn);
        },

        storeSessionFromCookie: function(cookieSession){
            this.set(cookieSession);
            this.store.update(this);
        },

        /**
         *
         */
        clearSession: function(){
            this.store.clear();
            this.vent.trigger('session:loggedout');
        },


        /**
         * Recovers any session data from the sessionStorage
         * to automatically log the user back in
         */
        recoverSession: function(){
            var localSession = this.store.get("session");
            if (localSession != null)
                this.storeSession(JSON.parse(localSession));
            else this.clearSession();
        },

        getCurrency: function(){
            return this.get('accountBalance').currency;
        },
        
        getCurrencySymbol: function(){
        
	    	var currencySymbols = {
	        	"ALL": "Lek",
	        	"AFN": "؋"	,
	        	"ARS": "$"  ,
	        	"AWG": "ƒ"  , 
	        	"AUD": "$"  ,
	        	"AZN": "ман", 
	        	"BSD": "$"  ,
	        	"BBD": "$"  ,
	        	"BYR": "p." ,
				"BZD": "BZ$",
				"BMD": "$"	,
				"BOB": "$b"	,
				"BAM": "KM"	,
				"BWP": "P"	,
				"BGN": "лв"	,
				"BRL": "R$"	,
				"BND": "$"	,
				"KHR": "៛"	,
				"CAD": "$"	,
				"KYD": "$"	,
				"CLP": "$"	,
				"CNY": "¥"	,
				"COP": "$"	,
				"CRC": "₡"	,
				"HRK": "kn"	,
				"CUP": "₱"	,
				"CZK": "Kč"	,
				"DKK": "kr"	,
				"DOP": "RD$",
				"XCD": "$"	,
				"EGP": "£"	,
				"SVC": "$"	,
				"EEK": "kr"	,
				"EUR": "€"	,
				"FKP": "£"	,
				"FJD": "$"	,
				"GHC": "¢"	,
				"GIP": "£"	,
				"GTQ": "Q"	,
				"GGP": "£"	,
				"GYD": "$"	,
				"HNL": "L"	,
				"HKD": "$"	,
				"HUF": "Ft"	,
				"ISK": "kr"	,
				"INR": "₹"	,
				"IDR": "Rp"	,
				"IRR": "﷼"	,
				"IMP": "£"	,
				"ILS": "₪"	,
				"JMD": "J$"	,
				"JPY": "¥"	,
				"JEP": "£"	,
				"KES": "KSh",
				"KZT": "лв"	,
				"KPW": "₩"	,
				"KRW": "₩"	,
				"KGS": "лв"	,
				"LAK": "₭"	,
				"LVL": "Ls"	,
				"LBP": "£"	,
				"LRD": "$"	,
				"LTL": "Lt"	,
				"MKD": "ден",
				"MYR": "RM"	,
				"MUR": "₨"	,
				"MXN": "$"	,
				"MNT": "₮"	,
				"MZN": "MT"	,
				"NAD": "$"	,
				"NPR": "₨"	,
				"ANG": "ƒ"	,
				"NZD": "$"	,
				"NIO": "C$"	,
				"NGN": "₦"	,
				"KPW": "₩"	,
				"NOK": "kr"	,
				"OMR": "﷼"	,
				"PKR": "₨"	,
				"PAB": "B/.",
				"PYG": "Gs"	,
				"PEN": "S/.",
				"PHP": "₱"	,
				"PLN": "zł"	,
				"QAR": "﷼"	,
				"RON": "lei",
				"RUB": "руб",
				"SHP": "£"	,
				"SAR": "﷼"	,
				"RSD": "Дин",
				"SCR": "₨"	,
				"SGD": "$"	,
				"SBD": "$"	,
				"SOS": "S"	,
				"ZAR": "R"	,
				"KRW": "₩"	,
				"LKR": "₨"	,
				"SEK": "kr"	,
				"CHF": "Fr.",
				"SRD": "$"	,
				"SYP": "£"	,
				"TZS": "TSh",
				"TWD": "NT$",
				"THB": "฿"	,
				"TTD": "TT$",
				"TRY": ""	,
				"TRL": "₤"	,
				"TVD": "$"	,
				"UGX": "USh",
				"UAH": "₴"	,
				"GBP": "£"	,
				"USD": "$"	,
				"UYU": "$U"	,
				"UZS": "лв"	,
				"VEF": "Bs"	,
				"VND": "₫"	,
				"YER": "﷼"	,
				"ZWD": "Z$"
			};
        
            return currencySymbols[this.get('accountBalance').currency];
        },

        /**
         * @returns {*}
         */
        getBalance: function(){
            return parseFloat(this.get('accountBalance').value).toFixed(2);
        },


        /**
         * @param bln
         */
        setBalance: function(balance){
            if (!this.isLoggedIn()) return;
            this.set('accountBalance', balance);
            this.store.update(this);
        },


        /**
         * @returns {*}
         */
        getUsername: function(){
            return this.get('username');
        },

        /**
         * @returns {*}
         */
        getName: function(){
            return this.get('name');
        },

        /**
         * @returns {*}
         */
        getSessionToken: function(){
            return this.get('sessionToken');
        },

        setSessionToken: function(token){
            this.set('sessionToken', token);
            this.store.update(this);
        },

        /**
         * @returns {*}
         */
        getAccountId: function(){
            return this.get('accountId');
        },


        getSession: function() {
            return this.store.get("session");
        },

        /**
         * Stores
         */
        store : {
            get: function() {
                return sessionStorage.getItem('session');
            },
            check: function(){
                return sessionStorage.getItem('session') != null;
            },
            clear: function(){
                return sessionStorage.removeItem('session');
            },
            update: function(scope){
                var json = scope.changed;
                if ( JSON.stringify(json) != '{}') {
                    sessionStorage.setItem("session", JSON.stringify(json));   
                }
            }
        }
    });
});


