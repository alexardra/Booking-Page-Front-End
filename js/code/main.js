ready(function() {
	get("templates.html", function(templates) {
		templates = filter(templates);	
		get("destinations.json", function(rawData) {
			var data = JSON.parse(rawData);
			var sections = data["sections"];
			var template = constructTemplate(templates, "browse_section_template");
			for (var i = 0; i < sections.length; i++) {
				var output = Mustache.render(template, data["sections"][i]);
				append(document.getElementById("browse"),output);
			}		
		});

		getScript("data-parser.js",function() {
			var dataParser = new DataParser(templates);
			dataParser.parse();
		})

		getScript("routs.js");
	});
});
