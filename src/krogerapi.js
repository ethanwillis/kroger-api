var rp = require("request-promise");
var fs = require("fs");

class KrogerAPI {
	constructor() {
		// read in configuration from JSON file
		var configurationObj = JSON.parse(fs.readFileSync('krogerconf.json', 'utf8'));
		// store categories in KrogerAPI object
		this.categories = configurationObj['categories'];
		// store paths in KrogerAPI object
		this.base_url = configurationObj['paths']['base_url'];
		this.auth_base_uri = configurationObj['paths']['auth_base_uri'];
		this.api_base_uri = configurationObj['paths']['api_base_uri'];
		this.products_uri = configurationObj['paths']['products_uri'];
	}
}
