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

		get("data.json", function(rawData) {
			var data = JSON.parse(rawData);
			var search_bar_template = constructTemplate(templates,"search_bar_template");
			var output = Mustache.render(search_bar_template,data);
			append(document.getElementById("cover"),output);	

			constructSearchRecentlyViewed(templates,data);
			constructCalendarDropdown(templates,data);
			searchbarEventHandler();

			getScript("calendar.js", function() {
				var calendar = new Calendar();
				calendar.construct();
			});
		});
	});
});

/* Search bar - dropdown recently viewed information */
function constructSearchRecentlyViewed(templates, data, num_to_show) {
	if (num_to_show == undefined) num_to_show = 2;

	var recently_viewed_dropdown = constructTemplate(templates,"recently_viewed_dropdown");
	output = Mustache.render(recently_viewed_dropdown, data);
	append(document.getElementById("search_container"),output);

	var recently_viewed_elem = constructTemplate(templates, "recently_viewed_elem");
	var recently_viewed_info = data["recently viewed info"];
	var num_viewed = recently_viewed_info.length;
	
	if (num_viewed < num_to_show) num_to_show = num_viewed;

	for (var i = 0; i < num_to_show; i++) {
		output = Mustache.render(recently_viewed_elem,recently_viewed_info[i]);
		addSeparatorInMenu("search_dropdown");
		append(document.getElementById("search_dropdown"),output);
	}

	var dropdown_template = constructTemplate(templates, "other_filter_dropdown_elem");
	var dropdown_data = data["dropdown details"];
	generateOtherFiltersDropdown(dropdown_template, dropdown_data);
}

function constructCalendarDropdown(templates,data) {
	var calendar_dropdown = constructTemplate(templates, "calendar_dropdown");
	var output = Mustache.render(calendar_dropdown,data);
	append(document.getElementById("calendar_container"),output);
}

function searchbarEventHandler() {

	var search_dropdown = document.getElementById("search_dropdown");
	var calendar_dropdown = document.getElementById("calendar_dropdown");
	var search_bar = document.querySelector("#search_bar input");
	var other_dropdown = document.getElementById("other_dropdown");

	document.getElementById("calendar_content").onclick = function() {
		toggleDropdown(calendar_dropdown);
	}

	search_bar.onfocus = function() {
		showOneDropdown(search_dropdown);
	}

	search_bar.onblur = function() {
		addClass(search_dropdown,"hidden");
	}

	document.getElementById("other_content").onclick = function() {
		toggleDropdown(other_dropdown);		
	}

	plusMinusIcons = document.querySelectorAll(".plus_icon, .minus_icon");
	for (var i = 0; i < plusMinusIcons.length; i++) {
		plusMinusIcons[i].onclick = function() {
			var buttonClass = this.className;
			var textPlaceholder = this.parentNode.querySelector("span");
			var text = textPlaceholder.innerHTML;
			changeHtml(textPlaceholder,generateTextInDropdown(buttonClass,text));
		}
	}
}


/* Toggle between display:none and other display */
function toggleDropdown(element) {	
	if (hasClass(element,"hidden")) {
		showOneDropdown(element);
	} else {
		addClass(element,"hidden");
	}
}

/* When displaying one of dropdown menus in search bar
   others should not be visible at the same time. */
function showOneDropdown(element) {
	var allDropdowns = document.getElementsByClassName("dropdown");
	addClass(allDropdowns, "hidden");
	removeClass(element,"hidden");
}

function generateOtherFiltersDropdown(dropdown_template, dropdown_data) {
	for (var i = 0; i < dropdown_data.length; i++) {
		var output = Mustache.render(dropdown_template, dropdown_data[i]);
		append(document.getElementById("other_dropdown"),output);
		createElementWithClass("div","separator", "other_dropdown")
	}
}

function generateTextInDropdown(buttonClass, current_text) {
	/* TODO add constraint on number - max 32 - 2 chars */
	var num = parseInt(current_text.substring(0,2));

	if (buttonClass == "minus_icon") {
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
	changeTextInSearchOther(new_text, (buttonClass == "plus_icon"));
	return new_text;
}

/* change content of div#other_filters 
   when dropdown content is changed by user */
function changeTextInSearchOther(new_text, plus) {
	var current_element = document.querySelector("#other_content span")
	var current_text = current_element.innerHTML;
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
	changeHtml(current_element,current_text);
}


/* Useful in meny cases - append after inserting element into menu */
function addSeparatorInMenu(menu) {
	var div = document.createElement("div");
	addClass(div,"separator");
	document.getElementById(menu).appendChild(div);
}
