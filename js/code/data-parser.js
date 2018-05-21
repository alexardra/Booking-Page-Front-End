/* Asynchronous request to retrieve main page data from server */

// var requestURL = '../js/destinations.json';

// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'text';
// request.send();

// request.onload = function() {
// 	console.log("request done");
//	var data = JSON.parse(request.response);
// }

/* JSON object - on server would be stored as json
 * file(destinations.json) and retrieved with above code */


/* Could become necessary */

/*function generateSectionElement(element_details) {
	var section_element = document.createElement("ul");
	for (var i = 0; i < 4; i++) {
		var info = element_details[i];
		var li = document.createElement("li");
		var info_container = document.createElement("div");
		info_container.className = "section_element";
		var text_container = document.createElement("span");
		text_container.textContent = info["name"];
		info_container.appendChild(text_container);
		li.appendChild(info_container);
		section_element.appendChild(li);
	}

	return section_element;
}

function generateSectionHeader(title) {
	var browse_header = document.createElement("div");
	browse_header.className = "browse_header";
	var header = document.createElement("h3");
	header.textContent = title;
	browse_header.appendChild(header);
	var see_all = document.createElement("button");
	see_all.textContent = "See All";
	browse_header.appendChild(see_all);

	return browse_header;	
}

function generateSection(section_data,parent_section) {
	var browse_section = document.createElement("div");
	browse_section.className = "browse_section";

	var browse_header = generateSectionHeader(section_data["header"]);
	browse_section.appendChild(browse_header);

	var overviews = section_data["overviews"];
	var section_element = generateSectionElement(overviews);
	browse_section.appendChild(section_element); 

	parent_section.appendChild(browse_section);
}

function parseAndDisplay(data_object) {
	var parent_section = document.querySelector('#browse');
	console.log(data_object['sections'].length);
	var sections = data_object["sections"];
	for (var i = 0; i < sections.length; i++) {
		generateSection(sections[i],parent_section);
	}
}

parseAndDisplay(data);*/


$.get('templates.html', function(templates) {
	$.when($.getJSON("destinations.json")).then(function(data,textStatus, jqXHR) {
		// if (jqXHR == '200') { // on success
			var sections = data["sections"];
			var template = $(templates).filter("#browse_section_template").html();
			for (var i = 0; i < sections.length; i++) {
				var output = Mustache.render(template, data["sections"][i]);
				$("#browse").append(output);
			}
		// }
		
	});

	$.when($.getJSON("data.json")).then(function(data,textStatus, jqXHR) {
		var template = $(templates).filter("#search_bar_template").html();
		var output = Mustache.render(template,data);
		$("#cover").append(output);	
	});

});


