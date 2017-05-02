var rp = require("request-promise");
var fs = require("fs");

class KrogerAPI {
	constructor() {
		// read in categories from JSON file
		var categoriesObj = JSON.parse(fs.readFileSync('krogercategories.json', 'utf8'));
		// store them in KrogerAPI object
		this.categories = categoriesObj['categories'];
	}
}
