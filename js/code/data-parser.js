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
	$("#search_container").append(output);

	var recently_viewed_elem = $(templates).filter("#recently_viewed_elem").html();
	var recently_viewed_info = data["recently viewed info"];
	var num_viewed = recently_viewed_info.length;
	
	if (num_viewed < num_to_show) num_to_show = num_viewed;

	for (var i = 0; i < num_to_show; i++) {
		output = Mustache.render(recently_viewed_elem,recently_viewed_info[i]);
		addSeparatorInMenu("#search_dropdown");
		$("#search_dropdown").append(output);
	}

	var dropdown_template = $(templates).filter("#other_filter_dropdown_elem").html();
	var dropdown_data = data["dropdown details"];
	generateOtherFiltersDropdown(dropdown_template, dropdown_data);
}

function constructCalendarDropdown(templates,data) {
	var calendar_dropdown = $(templates).filter("#calendar_dropdown").html();
	var output = Mustache.render(calendar_dropdown,data);
	$("#calendar_container").append(output);
}

function searchbarEventHandler() {

	$("#calendar_content").click(function() {
		toggleDropdown("#calendar_dropdown");
	});

	$("#search_bar input").focus(function() {
		showOneDropdown("#search_dropdown");
	});

	$("#search_bar input").blur(function() {
		$("#search_dropdown").addClass("hidden");
	});

	$("#other_content").click(function() {
		toggleDropdown("#other_dropdown");
	});


	$(".other_filter_dropdown_elem button").click(function() {
		var button_id = $(this).find($("i")).attr("id");
		var text = $(this).parent().find($("span")).html();
		$(this).parent().find($("span")).text(generateTextInDropdown(button_id, text));
	});

}

/* Toggle between display:none and other display */
function toggleDropdown(elem) {
	if ($(elem).hasClass("hidden")) {
		// $(elem).removeClass("hidden");
		showOneDropdown(elem);
	} else {
		$(elem).addClass("hidden");
	}	
}

/* When displaying one of dropdown menus in search bar
   others should not be visible at the same time. */
function showOneDropdown(dropdown_id) {
	$(".dropdown").addClass("hidden");
	$(dropdown_id).removeClass("hidden");
}

function generateOtherFiltersDropdown(dropdown_template, dropdown_data) {
	for (var i = 0; i < dropdown_data.length; i++) {
		var output = Mustache.render(dropdown_template, dropdown_data[i]);
		$("#other_dropdown").append(output);
		addSeparatorInMenu("#other_dropdown");
	}

}

function generateTextInDropdown(button_id, current_text) {
	/* constraint on number - max 32 2 chars */
	var num = parseInt(current_text.substring(0,2));

	if (button_id == "minus_icon") {
		if (num == 0) return current_text;
		num--;
		var new_text;
		if (num >= 9) {
			new_text = num + current_text.substring(2);
		} else {
			new_text = num + current_text.substring(1);
		}
	} else {
		num++;
		var new_text;
		if (num <= 10) {
			new_text = num + current_text.substring(1); 
		} else {
			new_text = num + current_text.substring(2);
		}
	}
	changeTextInSearch(new_text, (button_id == "plus_icon"));
	return new_text;
}

/* change content of div#other_filters 
   when dropdown content is changed by user */
function changeTextInSearch(new_text, plus) {
	var current_text = $("#other_content span").html();
	var toChange = new_text.substring(new_text.indexOf(" ") + 1);
	var index = current_text.indexOf(",");
	if (toChange == "room") {
		var toReplace = current_text.substring(0, index);
		current_text = current_text.replace(toReplace, new_text);
	} else { // adult or children - change number of guests
		var start_index = current_text.indexOf(",") + 2;
		var end_index = current_text.indexOf("guests");
		var replaceWith = parseInt(current_text.substring(start_index, end_index));
		if (plus) {
			replaceWith += 1;
		} else {
			replaceWith -= 1;
		}
		replaceWith.toString();
		var pre = current_text.substring(0,start_index);
		current_text = pre + replaceWith + " guests"
	}

	$("#other_content span").text(current_text);
}

/* Useful in meny cases - append after inserting element into menu */
function addSeparatorInMenu(menu) {
	$(menu).append($("<div></div>").addClass("separator"));
}

