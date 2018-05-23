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
		addSeparatorInMenu(".dropdown_content");
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
		addSeparatorInMenu("#other_filter_options_dropdown");
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
	var current_text = $("#other_filters span").html();
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

	$("#other_filters span").text(current_text);
}

/* Useful in meny cases - append after inserting element into menu */
function addSeparatorInMenu(menu) {
	$(menu).append($("<div></div>").addClass("separator"));
}
