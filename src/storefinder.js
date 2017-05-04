var rp = require('request-promise');
var zipcodes = require('zipcodes');

// Get all US zipcodes that are in five digit format
var ziplist = (zipcodes.radius(38134, 10000000)).filter(function(code) {
	var rexpforzip = /\d{5}/;
	return rexpforzip.exec(code);
});

// template for requests to find stores in a certain zip code
;

var getStoresByZip = function(zip) {
	var storeSearchReq = {
		baseUrl: 'https://www.kroger.com',
		uri: '/stores/api/graphql',
		jar: true,
		json: true,
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			'query': "query storeSearch($searchText: String!, $filters: [String]!) {  storeSearch(searchText: $searchText, filters: $filters) {    stores {      ...storeSearchResult    }    fuel {      ...storeSearchResult    }    shouldShowFuelMessage  }}fragment storeSearchResult on Store {  banner  vanityName  divisionNumber  storeNumber  phoneNumber  showWeeklyAd  showShopThisStoreAndPreferredStoreButtons  distance  latitude  longitude  address {    addressLine1    addressLine2    city    countryCode    stateCode    zip  }  pharmacy {    phoneNumber  }}",
			'variables': { 'searchText': "", 'filters': [] },
			'operationName': "storeSearch"
		},
		resolveWithFullResponse: true
	}
	// set zip code in request object
	storeSearchReq['body']['variables']['searchText'] = zip;
	
	// make the request
	// (call brendan eich i dont give a fuck)
	rp(storeSearchReq)
		.then(function(response) {
			console.log(response);		
		})
		.catch(function(error) {
			console.log("Error getting stores by zip: " + error)
		});
};

var getAllStores = function() {
	for(var i = 0; i < ziplist.length; ++i) {
		getStoresByZip(ziplist[i]);
	}
};

getAllStores();
