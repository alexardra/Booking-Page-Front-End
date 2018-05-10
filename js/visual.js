$(document).ready(function() {

	$(".hamburger").click(function() {
		toggleSideMenu();
	});

});

function toggleSideMenu() {
	if ($("#side-menu").hasClass("show_side_menu")) {
		$("#side-menu").removeClass("show_side_menu");
		$("#side-menu").css("display","none");
	} else {
		$("#side-menu").addClass("show_side_menu");
		$("#side-menu").css("display","block");
	}	
}