
class Category {
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}

	static getProducts(qc, category_id) {
		var qc_options =  {
			uri: "/storecatalog/clicklistbeta/api/products",
			baseUrl: "https://www.kroger.com",
			method: "GET",
			jar: true,
			qs: {
				"searchTerm": "",
				"categoryId": category_id,
				"pageSize": "48",
				"sort": "popularity"
			}
		}
		qc.run_query(qc_options, function(err, result) {
			if(err) {
				console.log("Error running query: " + err);
			} else {
				console.log(JSON.stringify(result,null,"\t"))
			}
		})
	}
}

module.exports = Category
