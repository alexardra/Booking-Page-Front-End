var Calendar = function() {
	var day_names = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var num_rows = 5;
	var already_clicked = false;


	/* Firs time generation of full calendar dropdown 
	   container with content html elements */
	function construct_calendar() {
		generate_visuals();
		display_day_names();
		var date = get_current_date();
		generate_calendar(date);
	}

	function generate_visuals() {
		for (var i = 0; i < num_rows + 1; i++) { // extra week div for names
			generate_week();
		}
	}

	function display_day_names() {
		var week = document.getElementById("calendar_days").children[0];
		var days = week.children;
		for (var i = 0; i < days.length; i++) {
			changeHtml(days[i], day_names[i])
		}
	}

	/* Return format - [24, 4, 2018] - integers. (Month index) */
	function get_current_date() {
		var current = new Date();
		current_year = current.getFullYear();
		current_month = current.getMonth();
		current_day = current.getDate();	
		return [current_day, current_month, current_year];
	}
		
	function generate_calendar(date) {
		days = get_days_in_month(date[1], date[2]);
		var date_header = document.getElementById("calendar_dropdown_content").getElementsByTagName("h2")[0];
		changeHtml(date_header, month_names[date[1]] + " " + date[2])

		make_five_rows(); // default
		if (days[0] == 5 && days.length == 31 || days[0] == 6 && days.length >= 30) {
			make_six_rows();
		} else if (days[0] == 0 && days.length == 28) {
			make_four_rows();
		} 
		display_days(days, date[0]);
	}

	function generate_week() {
		var week = week_container();
		document.getElementById("calendar_days").appendChild(week);

		for (var j = 0; j < 7; j++) {
			var day = day_container();
			week.appendChild(day);
		}	
	}

	function week_container() {
		return createElementWithClass("div","week");
	}

	function day_container() {
		return createElementWithClass("div","day");
	}

	/* five rows - default */
	function make_five_rows() {
		if (num_rows == 6) {
			var weeks = document.getElementById("calendar_days").children;
			var weekToRemove = weeks[weeks.length - 1];
			weekToRemove.parentNode.removeChild(weekToRemove);
			num_rows -= 1;
			addClass(removeClass(weeks,"six_rows_week"),"week");
		} else if (num_rows == 4) {
			generate_week();
			num_rows += 1;
			var weeks = document.getElementById("calendar_days").children;
			addClass(removeClass(weeks,"four_rows_week"),"week");
		}
	}

	/* Existing default 5 rows assumed */
	function make_six_rows() {	
		generate_week();
		num_rows += 1;
		var weeks = document.getElementById("calendar_days").children;
		addClass(removeClass(weeks,"week"),"six_rows_week");
	}

	/* Existing default 5 rows assumed */
	function make_four_rows() {
		num_rows -= 1;
		var weeks = document.getElementById("calendar_days").children;
		addClass(removeClass(weeks,"week"),"four_rows_week");
	}

	/* Display numbers visually*/
	function display_days(days, current_day) {
		var start_index = days[0];
		var index = 1; 
		var weeks = document.getElementById("calendar_days").children;

		for (var i = 0; i < days.length; i++) {
			if (days[i] == 0 && i != 0) index += 1;
			changeHtml(weeks[index].children[days[i]%7],i+1);
			if (i+1 == current_day) {
				addClass(weeks[index].children[days[i]%7],"current_day");
			}
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
	document.getElementById("left_arrow_icon").onclick = function() {
		clear_old_calendar();
		var date = generate_new_date();
		var month = date[1];
		if (month == 0) {
			date[2] -= 1;
			date[1] = 11;
		} else {
			date[1] -= 1;
		}
		highlight_current_day(date);
		generate_calendar(date);	
	}

	/* right arrow event handler - previous month generation */
	document.getElementById("right_arrow_icon").onclick = function() {
		clear_old_calendar();
		var date = generate_new_date();
		var month = date[1];
		if (month == 11) {
			date[2] += 1;
			date[1] = 0;
		} else {
			date[1] += 1;
		}
		highlight_current_day(date);
		generate_calendar(date);		
	}

	function clear_old_calendar() {
		var calendar_days = document.getElementById("calendar_days")
		for (var i = 0; i < num_rows * 7; i++) {
			var index = Math.floor(i/7) + 1;			
			changeHtml(calendar_days.children[index].children[i%7],"");
		}
		removeClass(calendar_days.getElementsByClassName("current_day"), "current_day");
	}

	function generate_new_date() {
		var current = document.getElementById("calendar_dropdown_content").getElementsByTagName("h2")[0].innerHTML;
		var month_name = current.substring(0, current.indexOf(" "));
		var month = month_names.indexOf(month_name);
		var year = parseInt(current.substring(current.indexOf(" ") + 1));
		return [undefined, month, year];
	}

	function highlight_current_day(date) {
		var current_date = get_current_date();
		if (current_date[1] == date[1] && current_date[2] == date[2]) {
			date[0] = current_date[0];
		}
	}

	return {
		construct: construct_calendar
	}
}

