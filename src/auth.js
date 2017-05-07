var rp = require("request-promise")
var tough = require("tough-cookie")

class Auth {
	constructor(callback) {
		var jar = new tough.CookieJar();
		var this_obj = this;
		
		this_obj.rp = rp;
		this_obj.jar = jar;
		rp.jar = this_obj.jar; 

		this.authenticate(function(auth_response) {
			this_obj.auth_response = auth_response;
			callback(this_obj);
		});
	}

	/**
	 * This function authenticates against the kroger basic HTTP auth forms.
	 */
	authenticate(callback) {
		var email = process.env.kroger_email;
		var password = process.env.kroger_password;
		var settings = {
			base_url: "https://www.kroger.com",
			auth_base_uri: "/user/authenticate"
		}
		var res = {}
		var options = {
			uri: settings.auth_base_uri,
			baseUrl: settings.base_url,
			method: "POST",
			jar: true,
			json: true,
			body: {
				account: {
					email: email,
						password: password,
					rememberMe: true
				},
				location: ""
			}
		}
	
		var req = rp(options)
			.catch(function(err) {
				throw "Error authenticating: " + JSON.stringify(err)
			})
			.then(function(response) {
				callback(response);
			});
	}

	get_rp() {
		return this.rp;
	}

	get_auth_response() {
		return this.auth_response;
	}
}

module.exports = Auth;
