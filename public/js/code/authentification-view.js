let View = require("./view.js");
let lib = require("./library.js");
let SignupView = require("./signup-view.js");
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
	
	lib.addClass(dropdown,"hidden");
    let userSpace = new View(viewRenderer, "user-settings", "authentication-dropdown");
    let img = document.getElementById("user-icon");
	img.src = response["user avatar"];
	document.getElementById("authentication-dropdown").innerHTML = "";
	userSpace.renderView(response);

    let logoutButton = document.getElementById('logout');
    // logoutButton.addEventListener("click", userLoggedOut(viewRenderer));
    logoutButton.addEventListener("click", function(evnt) {
    	evnt.preventDefault();
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

		if (lib.hasClass(dropdownElement, "hidden")) {
			console.log("----");
			lib.removeClass(dropdownElement,"hidden");
		} else {
			lib.addClass(dropdownElement,"hidden");
		}
	});
	listenLogInButton(viewRenderer);
	listenSignUpButton(viewRenderer);
	
}

function listenSignUpButton(viewRenderer){
	let signUpButton = document.getElementById('sign-up');
	let popView = new SignupView();
	popView.constructView(viewRenderer);
	popView.listen(signUpButton);

}

function listenLogInButton(viewRenderer) {
	let logInInput = document.getElementById('login').getElementsByTagName("input");
	logInInput[2].addEventListener("click", function () {
		event.preventDefault();
		if (logInInput[0].value == ""){
			logInInput[0].style.border = "1px solid red";
		}else{
			if (logInInput[1].value == ""){
				logInInput[1].style.border = "1px solid red";
			}else
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

