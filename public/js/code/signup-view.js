let lib = require("./library.js");
let View = require("./view.js");

class SignupView extends View { 

	constructor(){
		super();
	}

	constructView(viewRenderer){
		this._viewRenderer = viewRenderer;
	}

	listen(button){
		let signupView = this;
		button.addEventListener("click", function() {
			signupView.buttonOnClick(this);
		});
	}

	buttonOnClick(button) {
		let signupForm = document.getElementById("signup-container");
		if (signupForm == undefined){
			let parent = document.getElementsByTagName('body')[0];
			let signup = new View(this._viewRenderer, "signup-template", parent);
			signup.renderView();
			signupForm = document.getElementById("signup-container");

			lib.addClass(document.getElementById("app"), "faded");

			let dropdowns = document.getElementsByClassName("dropdown");
			let numDropdowns = dropdowns.length;
			for (let i = 0; i < numDropdowns; i++) {
				if (!lib.hasClass(dropdowns[i],"hidden")) {
					lib.addClass(dropdowns[i], "hidden");
				}
			}
			this.listenToSubmit(signupForm);
		}
	} 

	listenToSubmit(signupForm) {
		let signupView = this;
		let submitButton = signupForm.getElementsByTagName("button")[0];
		submitButton.addEventListener("click", function(evt) {
			evt.preventDefault();
			signupView.parse(signupForm);
		});

		document.getElementById("app").addEventListener("click", function(evnt) {
			signupForm = document.getElementById("signup-container");
			if (signupForm != undefined) {
				signupForm.parentNode.removeChild(signupForm);
				lib.removeClass(this,"faded");
			}
		});
	}

	parse(signupForm) {
		let signupView = this;
		let inputFields = signupForm.getElementsByTagName("input");
		let select = signupForm.getElementsByTagName("select")[0];
		let selectedContinent = select.options[select.selectedIndex].text;

		let email = inputFields[0].value;
		let name = inputFields[1].value;
		let age = inputFields[2].value;
		let password = inputFields[3].value;
		let password2 = inputFields[4].value;

		// password validation TODO

		let jsonToSend = {
			"email" : email, 
			"name" : name,
			"age" : age,
			"location" : selectedContinent,
			"password" : password, 
		}

		lib.sendJson(jsonToSend, "/users/register", function(json) {
			if (json["status"] == "success") {
				lib.getJsonWithFetch("/users.json", function(response) {
					let userSpace = new View(signupView._viewRenderer, "user-settings", "authentication-dropdown");
					let img = document.getElementById("user-icon");
					img.src = response["user avatar"];
					document.getElementById("authentication-dropdown").innerHTML = "";
					userSpace.renderView(response);

					let logoutButton = document.getElementById('logout');
					logoutButton.addEventListener("click", function(evnt) {
						evnt.preventDefault();

					});
				});
				lib.removeClass(document.getElementById("app"),"faded");
				let newUrl = "user=" + json["id"];
				window.location = "#" + newUrl;
			} 
		});

	}
}

module.exports = SignupView;