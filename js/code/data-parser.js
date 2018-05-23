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

$(document).ready(function() {
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
			var search_bar_template = $(templates).filter("#search_bar_template").html();
			var output = Mustache.render(search_bar_template,data);
			$("#cover").append(output);	

			constructSearchRecentlyViewed(templates,data);
			constructCalendarDropdown(templates,data);
			searchbarEventHandler();
		});
	});

});

/* Search bar - dropdown recently viewed information */
function constructSearchRecentlyViewed(templates, data, num_to_show) {
	if (num_to_show == undefined) num_to_show = 2;

	var recently_viewed_dropdown = $(templates).filter("#recently_viewed_dropdown").html();
	output = Mustache.render(recently_viewed_dropdown, data);
	$(".dropdown").append(output);

	var recently_viewed_elem = $(templates).filter("#recently_viewed_elem").html();
	var recently_viewed_info = data["recently viewed info"];
	var num_viewed = recently_viewed_info.length;
	
	if (num_viewed < num_to_show) num_to_show = num_viewed;

	for (var i = 0; i < num_to_show; i++) {
		output = Mustache.render(recently_viewed_elem,recently_viewed_info[i]);
		$(".dropdown_content").append($("<div></div").addClass("separator"));
		$(".dropdown_content").append(output);
	}

	var dropdown_template = $(templates).filter("#other_filter_dropdown_elem").html();
	var dropdown_data = data["dropdown details"];
	generateOtherFiltersDropdown(dropdown_template, dropdown_data);
}


function constructCalendarDropdown(templates,data) {
	var calendar_dropdown = $(templates).filter("#calendar_dropdown").html();
	var output = Mustache.render(calendar_dropdown,data);
	$("#calendar").append(output);
}

function searchbarEventHandler() {

	$("#calendar").click(function() {
		$("#other_filter_options_dropdown").addClass("hidden");
		toggle(".calendar_dropdown_content");
	});

	$("#search_bar input").focus(function() {
		$(".calendar_dropdown_content").addClass("hidden");
		$("#other_filter_options_dropdown").addClass("hidden");
		$(".dropdown_content").removeClass("hidden");
	});

	$("#search_bar input").blur(function() {
		$(".dropdown_content").addClass("hidden");
	});

	$("#other_filters").click(function() {
		// console.log("aaa");
		$(".dropdown_content").addClass("hidden");
		$(".calendar_dropdown_content").addClass("hidden");
		toggle("#other_filter_options_dropdown");
	});


	$(".other_filter_dropdown_elem button").click(function() {
		var button_id = $(this).find($("i")).attr("id");
		var text = $(this).parent().find($("span")).html();
		$(this).parent().find($("span")).text(generateTextInDropdown(button_id, text));
	});

}

/* Toggle between display:none and other display */
function toggle(elem) {
	if ($(elem).hasClass("hidden")) {
		$(elem).removeClass("hidden");
	} else {
		$(elem).addClass("hidden");
	}	
}

function generateOtherFiltersDropdown(dropdown_template, dropdown_data) {
	// console.log(dropdown_data.length);
	for (var i = 0; i < dropdown_data.length; i++) {
		var output = Mustache.render(dropdown_template, dropdown_data[i]);
		$("#other_filter_options_dropdown").append(output);
	}

}

function generateTextInDropdown(button_id, text) {
	/* constraint on number - max 32 2 chars */
	var num = parseInt(text.substring(0,2));

	if (button_id == "minus_icon") {
		if (num == 0) return text;
		num--;
		var new_text;
		if (num >= 9) {
			new_text = num + text.substring(2);
		} else {
			new_text = num + text.substring(1);
		}
	} else {
		num++;
		var new_text;
		if (num <= 10) {
			new_text = num + text.substring(1); 
		} else {
			new_text = num + text.substring(2);
		}
	}

	return new_text;
}