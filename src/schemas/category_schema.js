var SchemaObject = require('schema-object');
var Product = require('./product_schema.js');

var Category = new SchemaObject({
	count: {
		type: Number
	},
	categoryName: {
		type: String
	},
	categoryId: {
		type: String
	},
	subCategories: {
		type: [Category]
	},
	startIndex: {
		type: Number,
		required: false
	},
	totalItems: {
		type: Number,
		required: false
	},
	products: {
		type: [Product]
	}
});
