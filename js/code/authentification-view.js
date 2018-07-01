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

function userLoggedIn(data, viewRenderer){
	let response = JSON.parse(data);
	let dropdown = document.getElementById("authentication-dropdown");
	
    dropdown.style.display = "none";
    let userSpace = new View(viewRenderer, "user-settings", "authentication-dropdown");
    viewRenderer.changeChildView("authentication-dropdown", userSpace);
    let img = document.getElementById("user-icon");
	img.src = "/avatar.jpg";
    let logoutButton = document.getElementById('logout');
    // logoutButton.addEventListener("click", userLoggedOut(viewRenderer));
    logoutButton.addEventListener("click", function() {
    	event.preventDefault();
    	userLoggedOut(viewRenderer);
    });

}

function userLoggedOut(viewRenderer){
	let dropdown = document.getElementById("authentication-dropdown");
	let img = document.getElementById("user-icon");
	img.src = "/user_icon.png";

    let dropdownElement = new View(viewRenderer, "authentification-dropdown-element",
     "authentication-dropdown");
    viewRenderer.changeChildView("authentication-dropdown", dropdownElement);
	listenLogInButton(viewRenderer);
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
	listenLogInButton(viewRenderer);
	
}

function listenLogInButton(viewRenderer) {
	let logInInput = document.getElementById('login').getElementsByTagName("input");
	logInInput[2].addEventListener("click", function () {
		event.preventDefault();
		if (logInInput[0].value != "" && logInInput[1].value != ""){
			sendRequest("users.json", userLoggedIn, viewRenderer);	
		}
	});
	let facebookButton = document.getElementById('facebook-sign-in');
	facebookButton.addEventListener("click", function(){
		event.preventDefault();
		sendRequest("users.json", userLoggedIn, viewRenderer);
	});
	let googleButton = document.getElementById("google-sign-in");
	googleButton.addEventListener("click", function(){
		event.preventDefault();
		sendRequest("users.json", userLoggedIn, viewRenderer);
	});

}

module.exports = listenUserContainer;

