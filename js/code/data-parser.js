var lib = require("./library.js");
var ViewRenderer = require("./view-renderer.js");

function DataParser(templates) {

	function parse() {
		// lib.get("data.json", function(rawData) {
			// var data = JSON.parse(rawData);

			// var vr = new ViewRenderer(templates, data);
			// console.log("1");
			// vr.init();
			// console.log("enter handlers");
			// searchbarEventHandler();

		// });
	}

	function searchbarEventHandler() {

		var search_dropdown = document.getElementById("search-dropdown");
		var calendar_dropdown = document.getElementById("calendar-dropdown");
		var search_bar = document.querySelector("#search-bar input");
		var other_dropdown = document.getElementById("other-dropdown");

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


	return {
		parse: parse
	}
}

module.exports = DataParser;