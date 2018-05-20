$(document).ready(function() {

	$(".hamburger").click(function() {
		toggleSideMenu();
	});

	addSeparatorsInList($("#other"));
	alignSearchBar();

});

function toggleSideMenu() {
	if ($("#side-menu").hasClass("hidden")) {
		$("#side-menu").removeClass("hidden");
	} else {
		$("#side-menu").addClass("hidden");
	}	
}

var addSeparatorsInList = function(divId) {
	var listItems = $(divId).find("li");	
	for (var i = 0; i < listItems.length-1;i++) {
		$("<div></div>").addClass("separator").insertAfter(listItems[i]);
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