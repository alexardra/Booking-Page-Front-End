let lib = require("./library.js");

class Search {

    constructor() {
        console.log("search-view");
    }

    	/* change content of div#other_filters 
	   when dropdown content is changed by user */
	changeTextInSearchOther(newText, plus) {
		let currentElement = document.querySelector("#other-content span")
		let currentText = currentElement.innerHTML;
		let toChange = newText.substring(newText.indexOf(" ") + 1);
		let index = currentText.indexOf(",");
		if (toChange == "room") {
			let toReplace = currentText.substring(0, index);
			currentText = currentText.replace(toReplace, newText);
		} else { // adult or children - change number of guests
			let startIndex = currentText.indexOf(",") + 2;
			let endIndex = currentText.indexOf("guests");
			let replaceWith = parseInt(currentText.substring(startIndex, endIndex));
			if (plus) {
				replaceWith += 1;
			} else {
				replaceWith -= 1;
			}
			replaceWith.toString();
			let pre = currentText.substring(0,startIndex);
			currentText = pre + replaceWith + " guests"
		}
		lib.changeHtml(currentElement,currentText);
    }
	
	// changeInParent - if true changes other-content span 
    generateTextInDropdown(buttonClass, currentText, changeInParent) {
		/* TODO add constraint on number - max 32 - 2 chars */
        let num = parseInt(currentText.substring(0,2));
        
        let newText;
		if (buttonClass == "minus_icon") {
			if (num == 0) return currentText;
			num--;	
			if (num >= 9) {
				newText = num + currentText.substring(2);
			} else {
				newText = num + currentText.substring(1);
			}
		} else {
			num++;
			if (num <= 10) {
				newText = num + currentText.substring(1); 
			} else {
				newText = num + currentText.substring(2);
			}
		}
		if (changeInParent) {
			this.changeTextInSearchOther(newText, (buttonClass == "plus_icon"));		
		}
		return newText;
	}

    getSearchOptionsInfo(element) {
        let info = element.getElementsByTagName("span")[0].innerHTML;    
        let num = info.substring(0,info.indexOf(" "));
        return num;
	}
	
	formatCalendarInSearchBar() {
        let dates = document.querySelectorAll("input[type='date']");
        let numDates = dates.length;
        let currentDate = lib.getFormatedDate();
        for (let i = 0; i < numDates; i++) {
            dates[i].value = currentDate;
        } 
    }

    	/* Toggle between display:none and other display */
	toggleDropdown(element) {	
		if (lib.hasClass(element,"hidden")) {
			this.showOneDropdown(element);
		} else {
			lib.addClass(element,"hidden");
		}
	}

	/* When displaying one of dropdown menus in search bar
	   others should not be visible at the same time. */
	showOneDropdown(element) {
		var allDropdowns = document.getElementsByClassName("dropdown");
		lib.addClass(allDropdowns, "hidden");
		lib.removeClass(element,"hidden");
	}
} 

module.exports = Search;