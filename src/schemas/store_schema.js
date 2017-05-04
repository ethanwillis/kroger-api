var SchemaObject = require('schema-object');

var Store_Address = new SchemaObject({
	addressLine1: {
		type: String
	},
	city: {
		type: String
	},
	stateCode: {
		type: String
	},
	zip: {
		type: String
	}
});

var Hours = new SchemaObject({
	sundayClose: {
		type: String
	},
	sundayOpen: {
		type: String
	},
	mondayClose: {
		type: String
	},
	mondayOpen: {
		type: String
	},
	tuesdayClose: {
		type: String
	},
	tuesdayOpen: {
		type: String
	},
	wednesdayClose: {
		type: String
	},
	wednesdayOpen: {
		type: String
	},
	thursdayClose: {
		type: String
	},
	thursdayOpen: {
		type: String
	},
	fridayClose: {
		type: String
	},
	fridayOpen: {
		type: String
	},
	saturdayClose: {
		type: String
	},
	saturdayOpen: {
		type: String
	}
});

var Store_Pharmacy = new SchemaObject({
	phoneNumber: {
		type: String
	},
	hours: {
		type: Hours
	}
});

var Store_Department = new SchemaObject({
	friendlyName: {
		type: String
	}
});

var Store_Online_Service = new SchemaObject({
	name: {
		type: String
	},
	url: {
		type: String
	}
});

var Store = new SchemaObject({
	divisionNumber: {
		type: String
	},
	storeNumber: {
		type: String
	},
	vanityName: {
		type: String
	},
	phoneNumber: {
		type: String
	},
	latitude: {
		type: String
	},
	longitude: {
		type: String
	},
	brand: {
		type: String
	},
	localName: {
		type: String
	},
	address: {
		type: Store_Address	
	},
	pharmacy: {
		type: Store_Pharmacy
	},
	hours: {
		type: Hours
	},
	departments: {
		type: [Store_Department]
	},
	onlineServices: {
		type: [Store_Online_Service]
	}
});
