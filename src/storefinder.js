var rp = require('request-promise');
var zipcodes = require('zipcodes');

// Get all US zipcodes that are in five digit format
var ziplist = (zipcodes.radius(38134, 10000000)).filter(function(code) {
	var rexpforzip = /\d{5}/;
	return rexpforzip.exec(code);
});

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

var getStoresByZip = function(zip) {
	// make new request object
	var storeSearchReq = new ZipcodeRequest(zip);
	// make the request
	// (call brendan eich i dont give a fuck)
	rp(storeSearchReq)
	.then(function(response) {
		var storesArr = response['data']['storeSearch']['stores'];
		console.log(JSON.stringify(storesArr));
	})
	.catch(function(error) {
		console.log(error);
	});
};

var getAllStores = function() {
	var ziparr = new Array();
	for(var i = 0; i < ziplist.length; ++i) {
		setTimeout(getStoresByZip, currTimeout, ziplist[i]);
		currTimeout += 30000;
	}
};

getAllStores();
