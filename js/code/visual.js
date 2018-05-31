ready(function() {

	document.getElementsByClassName("hamburger")[0].onclick = function() {
		toggleSideMenu();
	}

	addSeparatorsInList(document.getElementById("other"));

});


var addSeparatorsInList = function(divId) {
	// var listItems = $(divId).find("li");
	var listItems = document.getElementById(divId).querySelectorAll("li");
	for (var i = 0; i < listItems.length-1;i++) {
		var div = createElement("div");
		addClass(div,"separator");
		div.insertAdjacentHTML('afterend', listItems[i]);
	}
}

function alignSearchBar() {
	var search_bar_width = $("#search_bar").outerWidth();
	var location_width = $("#location").outerWidth();
	var input_width = $("#search_bar input").outerWidth();
	var calendar_width = $("#calendar").outerWidth();
	var other_filter_options_width = $("#other_filter_options").outerWidth();

	var widthForLastElem = search_bar_width - location_width - input_width - calendar_width - other_filter_options_width - 2;
	$('#element').css("width","calc(100% - " + widthForLastElem + ")");
}
