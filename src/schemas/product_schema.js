var SchemaObject = require('schema-object');


// TODO: Find a Product from Kroger that doesn't have catentryId set to null so we can
// know what the actual type should be.
var Product = new SchemaObject({
	name: {
		type: String
	},
	buyable: {
		type: Boolean
	},
	catentryId: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	fullImageAltDescription: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	imageUrl: {
		type: String
	},
	regularPrice: {
		type: String
	},
	salePrice: {
		type: String
	},
	offerDescription: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	offerQuantity: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	offerPrice: {
		type: String,
		minLength: 0
	},
	offerType: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	offerEndDate: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	sizing: {
		type: String
	},
	thumbnail: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	wcsProductId: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	upc: {
		type: String
	},
	soldBy: {
		type: String
	},
	orderBy: {
		type: String
	},
	serviceCenter: {
		type: String,
		setUndefined: true,
		preserveNull: true
	},
	imageUrls: {
		type: [String]
	},
	thumbnails: {
		type: [String],
		setUndefined: true,
		preserveNull: true
	},
	priceSizingDescription: {
		type: String
	},
	specialInstruction: {
		type: String
	},
	countryOfOrigin: {
		type: String
	},
	ageRestricted: {
		type: Boolean
	},
	currentPrice: {
		type: String
	},
	currentPriceIsYellowTag: {
		type: String
	}
})
