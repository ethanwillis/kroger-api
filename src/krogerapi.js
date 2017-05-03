var rp = require("request-promise");
var fs = require("fs");

class KrogerAPI {
	constructor(confpath) {
		// read in configuration from JSON file
		var configurationObj = JSON.parse(fs.readFileSync(confpath, 'utf8'));
		// store categories in KrogerAPI object
		this.categories = configurationObj['categories'];
		// store paths in KrogerAPI object
		this.base_url = configurationObj['paths']['base_url'];
		this.auth_base_uri = configurationObj['paths']['auth_base_uri'];
		this.api_base_uri = configurationObj['paths']['api_base_uri'];
		this.products_uri = configurationObj['paths']['products_uri'];
		// read username and password from environment
		this.username = process.env.KROGER_USERNAME;
		this.password = process.env.KROGER_PASSWORD;
		// put object in different scope
		var kApi = this;
		// set authentication request
		this.auth_options = {
			uri: kApi.auth_base_uri,
			baseUrl: kApi.base_url,
			method: "POST",
			json: true,
			jar: true,
			body: {
				account: {
					email: kApi.username,
					password: kApi.password,
					rememberMe: true
				},
				location: ""
			}
		}
	}
	
	authenticate() {
		var req = rp(this.auth_options).then(function(response) {
			console.log("Kroger AUTH response: \n" + JSON.stringify(response));
		});
	}
	
	getStores() {
		
	}
}

var x = new KrogerAPI('krogerconf.json');
console.log(JSON.stringify(x.auth_options));
x.authenticate();
