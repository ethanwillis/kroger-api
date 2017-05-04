global.fetch = require('node-fetch')
var FetchQL = require('fetchql')

var query = "query storeSearch($searchText: String!, $filters: [String]!) {  storeSearch(searchText: $searchText, filters: $filters) {    stores {      ...storeSearchResult    }    fuel {      ...storeSearchResult    }    shouldShowFuelMessage  }}fragment storeSearchResult on Store {  banner  vanityName  divisionNumber  storeNumber  phoneNumber  showWeeklyAd  showShopThisStoreAndPreferredStoreButtons  distance  latitude  longitude  address {    addressLine1    addressLine2    city    countryCode    stateCode    zip  }  pharmacy {    phoneNumber  }}"

var variables = {
	searchText: "",
	filters: []
}

var operationName = "storeSearchi"

var url = "https://www.kroger.com/stores/api/graphql";

var queryParams = {
	operationName: operationName,
	query: query,
	variables: variables
}

const testQuery = new FetchQL({
	url: url,
	headers: {
		'Content-Type': 'application/json'
	},
	onStart(requestQueueLength) {
		startTrack = true;
		queueLength = requestQueueLength;
		console.log("start: " + requestQueueLength);
	},
	onEnd(requestQueueLength) {
		endTrack = true;
		queueLength = requestQueueLength;
		console.log("end: " + queueLength);
	},
});

testQuery.query(queryParams)
	.then(function(data) {
		console.log("data: " + data)
	})
	.catch(function(err) {
		console.log("error: " + JSON.stringify(err));	
	});

