let View = require("./view.js");
let lib = require("./library.js");
// let viewRenderer = require("./view-renderer.js")

function sendRequest(url, callback, viewRenderer) {
	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		// Success!
		var data = request.responseText;
		callback(data, viewRenderer);
	  } else {
		// We reached our target server, but it returned an error
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
		console.log("error");
	};
	request.send();
}

function usernameLoggedIn(data, viewRenderer){
	let response = JSON.parse(data);
	let dropdown = document.getElementById("authentication-dropdown");
	let img = document.getElementById("user-icon");
	img.src = "/avatar.jpg";
	while (dropdown.firstChild) {
    	dropdown.removeChild(dropdown.firstChild);
	}
    dropdown.style.display = "none";
    let userSpace = new View(viewRenderer, "user-settings", "authentication-dropdown");
    userSpace.renderView();
}

function listenUserContainer(viewRenderer) {
	let userIcon = document.getElementById('user-icon');
	userIcon.addEventListener("click", function () {
		let dropdownElement = document.getElementById("authentication-dropdown");
		let style = window.getComputedStyle(dropdownElement);
		if (style.getPropertyValue("display") == "none" ){
			dropdownElement.style.display = "inline-block";
		}else{
			dropdownElement.style.display = "none";
		}
	});
	let button = document.getElementById('login').getElementsByTagName("input")[2];
	button.addEventListener("click", function () {
		event.preventDefault();
		sendRequest("users.json", usernameLoggedIn, viewRenderer);
	});

}


module.exports = listenUserContainer;

