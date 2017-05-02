var rp = require("request-promise");
require('request-debug')(rp)

var categories = [
		{
			name: "Adult Beverage",
			category_id: "105698"
		},
		{
			name: "Baby",
			category_id: "105502"
		},
		{
			name: "Bakery",
			category_id: "105511"
		},
		{
			name: "Baking Goods",
			category_id: "105664"
		},
		{
			name: "Beverages",
			category_id: "105536"
		},
		{
			name: "Breakfast",
			category_id: "105556"
		},
		{
			name: "Bulk Foods",
			category_id: "105568"
		},
		{
			name: "Canned & Packaged",
			category_id: "105575"
		},
		{
			name: "Cleaning Products",
			category_id: "105595"
		},
		{
			name: "Condiments & Toppings",
			category_id: "105606"
		},
		{
			name: "Dairy",
			category_id: "105627"
		},
		{
			name: "Deli",
			category_id: "105642"
		},
		{
			name: "Frozen",
			category_id: "105647"
		},
		{
			name: "International",
			category_id: "105691"
		},
		{
			name: "Meat & Seafood",
			category_id: "105705"
		},
		{
			name: "Paper & Plastics",
			category_id: "105711"
		},
		{
			name: "Pasta, Sauces, Grain",
			category_id: "105721",
		},
		{
			name: "Pet Care",
			category_id: "105724"
		},
		{
			name: "Produce",
			category_id: "105729"
		},
		{
			name: "Snacks",
			category_id: "105737"
		},
		{
			name: "Tobacco",
			category_id: "105755"
		}
	];


var kroger_api = {
  base_url: "https://www.kroger.com",
  auth_base_uri: "/user/authenticate",
  api_base_uri: "/storecatalog/clicklistbeta/api",
  products_uri: "/storecatalog/clicklistbeta/api/products",
  build_category_api_endpoint: function(search_term, category_id, page_number, page_size, sort) {
    var endpoint = this.products_api_endpoint_base;

    // Defaults
    if(sort == null) {
      sort="popularity";
    }

    // Build endpoint with parameters
    endpoint += this.products_api_param_search_term + search_term + "&";
    endpoint += this.products_api_param_category_id + category_id + "&";
    endpoint += this.products_api_param_page_number + page_number + "&";
    endpoint += this.products_api_param_page_size + page_size + "&";
    endpoint += this.products_api_param_sort + sort;

    return endpoint;
  },
  authenticate: function(email, password) {
    var res = {};
    options = {
      uri: this.auth_base_uri,
      baseUrl: this.base_url,
      method: "POST",
      jar: true,
      json: true,
      body: {
        account: {
          email: email,
          password: password,
          rememberMe: true
        },
        location: ""
      }
    }

    var req = rp(options)
      .catch(function(err) {
        console.log("Error Authenticating: " + JSON.stringify(err));
      });
      return req;
  },

  get_num_products_by_category: function(category_id) {
    var num_products = 9999;

    options = {
      uri: this.products_uri,
      baseUrl: this.base_url,
      method: "GET",
      jar: true,
      qs: {
        "searchTerm": "",
        "categoryId": category_id,
        "pageNumber": "1",
        "pageSize": "1",
        "sort": "popularity"
      }
    };

    var req = rp(options)
      .catch(function(err) {
        console.log("Error getting number of products -- Defaulting to 9999" + err);
      });
    return req;
  },/*
  get_products_by_category: function(category_id) {
    var products = [];
    num_products = this.get_num_products_by_category(category_id, headers, request);
    endpoint = this.build_category_api_endpoint(category_id, "1", num_products, null);
    options = {
      method: "GET",
      uri: endpoint
    }
    rp(options)
      .then(function(response) {
        products = JSON.parse(res.response.content).products;
        return products;
      })
      .catch(function(err) {
        console.log("Error getting all products for category " + category_id);
        return products;
      });
	},
	get_all_products: function(category_id_list) {
    category_products = [];
    category_id_list.map(function(category) {
      products_list = this.get_products_by_category(category.category_id, headers, request)

      annotated_products = [];
      products_list.map(function(product) {
        products_list.product_category = category;
        annotated_products.push[product];
      });

      category_products.push[{category: category, products: annotated_products}];
    });

    return category_products;
	}*/
};


// Main program starts here.

var auth_options = {
	uri: kroger_api.auth_base_uri,
	baseUrl: kroger_api.base_url,
	method: "POST",
	json: true,
	jar: true,
	body: {
		account: {
			email: "",
			password: "",
			rememberMe: true
		},
		location: ""
	}
}

var auth_options_two = {
	url: "https://www.kroger.com/storecatalog/clicklistbeta/#/",
	jar: true
}

var count_products_options = {
	url: 'https://www.kroger.com/storecatalog/clicklistbeta/api/products',
	jar: true,
	json: true,
	qs:
    { searchTerm: '',
      categoryId: '105721',
      pageNumber: '1',
      pageSize: '1',
      sort: 'popularity' },
	headers: {
		"content-type": "application/json;"
	}
};

var req = rp(auth_options)
 .then(function(response) {
	 console.log("Kroger Auth Response: " + JSON.stringify(response));
	 rp(auth_options_two)
	 	.then(function(response){
			var num_products = 9999;
	 		var category_id = "105721";
	 		var req = rp(count_products_options)
	 		 .then(function(response) {
	 			 console.log("Products Response: " + response.statusCode);
	 	     //console.log(JSON.stringify(response))
	 	     //num_products = JSON.parse(response.body).totalItems;
	 	     //console.log("# Products" + num_products);
	 	   })
	 		 .catch(function(err) {
	 			 console.log("Error getting number of products -- Defaulting to 9999" + err);
	 		 });
		})
		.catch(function(err) {
			console.log("Error Authenticating (2): " + JSON.stringify(err));
		})
 })
 .catch(function(err) {
	 console.log("Error Authenticating (1): " + JSON.stringify(err));
 });
