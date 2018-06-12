var lib = require("./library.js");
var DataParser = require("./data-parser.js");
var routs = require("./routs.js");

lib.ready(function() {
	lib.get("templates.html", function(templates) {
		templates = lib.filter(templates);	
		// get("destinations.json", function(rawData) {
		// 	var data = JSON.parse(rawData);
		// 	var sections = data["sections"];
		// 	var template = constructTemplate(templates, "browse_section_template");
		// 	for (var i = 0; i < sections.length; i++) {
		// 		var output = Mustache.render(template, data["sections"][i]);
		// 		append(document.getElementsByClassName("browse")[0],output);
		// 	}		
		// });
		var dataParser = new DataParser(templates);
		dataParser.parse();

		// lib.getScript("routs.js");

	});
});
