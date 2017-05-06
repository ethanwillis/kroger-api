var HashMap = require('hashmap');
var zipcodes = require('zipcodes');
var fs = require('fs');
var rp = require('request-promise');
var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://localhost:27017/krogerdb"


// Get all zipcodes in tennessee
var ziplist = (zipcodes.radius(38134, 10000000)).filter(function(code) {
	return ((parseInt(code) >= 37000) && (parseInt(code) < 38600));
});

// Hashmap for recording stores
var storeMap = new HashMap();

// template for requests to find stores in a certain zip code
//var storeSearchReq = {
	//baseUrl: 'https://www.kroger.com',
	//uri: '/stores/api/graphql',
	//jar: true,
	//json: true,
	//method: "POST",
	//headers: {
		//'Content-Type': 'application/json'
	//},
	//body: {
		//'query': "query storeSearch($searchText: String!, $filters: [String]!) {  storeSearch(searchText: $searchText, filters: $filters) {    stores {      ...storeSearchResult    }    fuel {      ...storeSearchResult    }    shouldShowFuelMessage  }}fragment storeSearchResult on Store {  banner  vanityName  divisionNumber  storeNumber  phoneNumber  showWeeklyAd  showShopThisStoreAndPreferredStoreButtons  distance  latitude  longitude  address {    addressLine1    addressLine2    city    countryCode    stateCode    zip  }  pharmacy {    phoneNumber  }}",
		//'variables': { 'searchText': "38134", 'filters': [] },
		//'operationName': "storeSearch"
	//}
//};

var currTimeout = 0;
var reqCompletion = 0;

function ZipcodeRequest(zip) {
	this.baseUrl = 'https://www.kroger.com';
	this.uri = '/stores/api/graphql';
	this.jar = true;
	this.json = true;
	this.method = 'POST';
	this.headers = {
		'Content-Type': 'application/json'
	};
	this.body = {
		'query': "query storeSearch($searchText: String!, $filters: [String]!) {  storeSearch(searchText: $searchText, filters: $filters) {    stores {      ...storeSearchResult    }    fuel {      ...storeSearchResult    }    shouldShowFuelMessage  }}fragment storeSearchResult on Store {  banner  vanityName  divisionNumber  storeNumber  phoneNumber  showWeeklyAd  showShopThisStoreAndPreferredStoreButtons  distance  latitude  longitude  address {    addressLine1    addressLine2    city    countryCode    stateCode    zip  }  pharmacy {    phoneNumber  }}",
		'variables': {
			'searchText': zip,
			'filters': []
		},
		'operationName': 'storeSearch'
	};
}

var getStoresByZip = function(zip, db_client) {
	// Debugging message
	console.log("Working on ZIP code: " + zip + "...\n");
	// make new request object
	var storeSearchReq = new ZipcodeRequest(zip);
	// make the request
	// (call brendan eich i dont give a fuck)
	rp(storeSearchReq)
	.then(function(response) {
		var storesArr = response['data']['storeSearch']['stores'];
		if (storesArr != null) {
			for(var i = 0; i < storesArr.length; ++i) {
				var x = storesArr[i];
				if(storeMap.get(x['storeNumber'])) {
					storeMap.set(x['storeNumber'], x);
  				} else {
					save_store(x, db_client)
				}
			}
		}
	})
	.catch(function(error) {
		console.log(error);
	});
};

var save_store = function(store, db_client) {
	var mongo_collection = db_client.collection("stores");
	store._id = store.storeNumber;
	mongo_collection.insert(store, function(err, result) {
		if(err) {
			console.log("INSERTION ERROR: " + err)
		} else {
			console.log("INSERTION SUCCESS: " + result);
		}
	});
}

var getAllStores = function() {
	MongoClient.connect(mongo_url, function(err, db_client) {
		if(err) {
			console.log("CONNECTION ERROR: " + err);
		} else {
			for(var i = 0; i < ziplist.length; ++i) {
				setTimeout(getStoresByZip, currTimeout, ziplist[i], db_client);
				currTimeout += 3000;
			}
		}
	});
};

getAllStores();
