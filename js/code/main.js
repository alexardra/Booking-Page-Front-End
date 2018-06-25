let lib = require("./library.js");
let DataParser = require("./data-parser.js");
let RoutController = require("./rout-controller.js");

lib.ready(function() {
	lib.get("templates.html", function(templates) {
		templates = lib.filter(templates);
		lib.getJsonWithFetch("data.json", function(data) {
			let routController = new RoutController(templates, data);
		});
	})
});
