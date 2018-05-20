$(document).ready(function() {

	$(".hamburger").click(function() {
		toggleSideMenu();
	});

	addSeparatorsInList($("#other"));

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