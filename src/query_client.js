var Auth = require('./auth.js')
var Query = require('./query.js')
var Category = require('./category.js')
var Store = require('./store.js')

// Authenticate
var auth = new Auth(function(auth_obj) {
	var qc = new Query(auth_obj);
	//console.log(JSON.stringify(auth_obj.auth_response))
	//Category.getCategories(qc, "006600", "024")
	Category.getProducts(qc, "01001");
});
