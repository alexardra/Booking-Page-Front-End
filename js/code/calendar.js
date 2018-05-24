var day_names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var num_rows = 5;

/* Firs time generation of full calendar dropdown 
   container with content html elements */
function construct_calendar() {
	generate_visuals();
	display_day_names();
	var date = get_current_date();
	generate_calendar(date);
}

function generate_visuals() {
	for (var i = 0; i < num_rows + 1; i++) {
		generate_week();
	}
}

function display_day_names() {
	var week = $("#calendar_days").children()[0];
	var days = $(week).children();

	for (var i = 0; i < days.length; i++) {
		$(days[i]).text(day_names[i]);
	}
}

/* Return format - [24, 4, 2018] - integers. (Month index) */
function get_current_date() {
	var current = new Date();
	current_year = current.getFullYear();
	current_month = current.getMonth();
	current_day = current.getDay();	
	return [current_day, current_month, current_year];
}
	
function generate_calendar(date) {
	days = get_days_in_month(date[1], date[2]);
	$("#calendar_dropdown_content h2").text(month_names[date[1]] + " " + date[2]);
	make_five_rows(); // default
	if (days[0] == 5 && days.length == 31 || days[0] == 6 && days.length >= 30) {
		make_six_rows();
	} else if (days[0] == 0 && days.length == 28) {
		make_four_rows();
	} 
	display_days(days);
}

function generate_week() {
	var week = week_container();
	$("#calendar_days").append(week);
	for (var j = 0; j < 7; j++) {
		var day = day_container();
		week.append(day);
	}	
}

function week_container() {
	return $("<div></div>").addClass("week");
}

function day_container() {
	return $("<div></div>").addClass("day");
}

/* five rows - default */
function make_five_rows() {
	if (num_rows == 6) {
		$("six_rows_week").last().remove();
		num_rows -= 1;
		$("#calendar_days").children().removeClass("six_rows_week").addClass("week");	
	} else if (num_rows == 4) {
		generate_week();
		num_rows += 1;
		$("#calendar_days").children().removeClass("four_rows_week").addClass("week");
	}
}

/* Existing default 5 rows assumed */
function make_six_rows() {	
	generate_week();
	num_rows += 1;
	$("#calendar_days").children().removeClass("week").addClass("six_rows_week");
}

/* Existing default 5 rows assumed */
function make_four_rows() {
	num_rows -= 1;
	$("#calendar_days").children().removeClass("week").addClass("four_rows_week");
}

/* Display numbers visually*/
function display_days(days) {
	var start_index = days[0];
	var index = 1; 
	for (var i = 0; i < days.length; i++) {
		if (days[i] == 0 && i != 0) index += 1;
		$("#calendar_days").children().eq(index).children().eq(days[i]%7).text(i+1);
	}
}

/* Get days in a month with corresponding week numbers */
function get_days_in_month(month, year) {
	var date = new Date(year, month, 1);
	var days = [];
	while (date.getMonth() === month) {
		days.push(new Date(date).getDay());
		date.setDate(date.getDate() + 1);
	}
	return days;
}

/* left arrow event handler - next month generation */
$("#left_arrow_icon").click(function() {
	clear_old_calendar();
	var date = generate_new_date();
	var month = date[1];
	if (month == 0) {
		date[2] -= 1;
		date[1] = 11;
	} else {
		date[1] -= 1;
	}
	generate_calendar(date);

});

/* right arrow event handler - previous month generation */
$("#right_arrow_icon").click(function() {
	clear_old_calendar();
	var date = generate_new_date();
	var month = date[1];
	if (month == 11) {
		date[2] += 1;
		date[1] = 0;
	} else {
		date[1] += 1;
	}
	generate_calendar(date);
});

function generate_new_date() {
	var current = $("#calendar_dropdown_content h2").html();
	var month_name = current.substring(0, current.indexOf(" "));
	var month = month_names.indexOf(month_name);
	var year = parseInt(current.substring(current.indexOf(" ") + 1));
	var day = (new Date().getDay());
	return [day, month, year];
}

function clear_old_calendar() {
	for (var i = 0; i < (num_rows + 1) * 7; i++) {
		var index = Math.floor(i/7) + 1;
		console.log(index);
		console.log(i%7);
		$("#calendar_days").children().eq(index).children().eq(i%7).empty();
	}
}
