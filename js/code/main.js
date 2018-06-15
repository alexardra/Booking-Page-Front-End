let lib = require("./library.js");
let DataParser = require("./data-parser.js");
let RoutController = require("./rout-controller");

lib.ready(function() {

	lib.get("templates.html", function(templates) {
		templates = lib.filter(templates);
		lib.get("data.json", function(rawData) {
			let data = JSON.parse(rawData);
	
			let routController = new RoutController(templates, data);
		});
	})
});
