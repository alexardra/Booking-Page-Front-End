function sendRequest(url, callback) {
	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		// Success!
		var data = request.responseText;
		callback(data);
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

function usernameLoggedIn(data){
	let response =  JSON.parse(data);
	document.getElementById("username").innerHTML = response["username"];
}

function listenUserContainer() {
	let userIcon = document.getElementById('user-icon');
	userIcon.addEventListener("click", function () {
		let dropdownElement = document.getElementById("authentication-dropdown");
		if (dropdownElement.style.display == "none"){
			dropdownElement.style.display = "inline-block";
		}else{
			dropdownElement.style.display = "none";
		}
	});
	let button = document.getElementById('login');
	button.addEventListener("click", function () {
		event.preventDefault()
		sendRequest("users.json", usernameLoggedIn);
	});

}


module.exports = listenUserContainer;

