class Query {
	constructor(auth_obj) {
		this.auth = auth_obj;
	}

	run_query(options, callback) {
		console.log("rp type: " + typeof this.auth.rp);
		var req = this.auth.rp(options)
			.catch(function(err) {
				var error = "Error running query:" +
					"\n\tOptions: " + JSON.stringify(options,null,"\t") +
					"\nt\tError: " + JSON.stringify(err,null,"\t")

				callback(err, null);
			})
			.then(function(response) {
				callback(null, response);
			});
	}

	get_jar() {
		return this.auth.jar;
	}

	update_jar_cookie(old_cookie, new_cookie) {
		this.jar.updateCookie(old_cookie, new_cookie, function(err) {
			if(err) {
				console.log("Error updating cookie");
			}
		})
	}
}

module.exports = Query
