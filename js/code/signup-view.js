let View = require("./view.js");
let lib = require("./library.js");


class SignupView extends View{
	constructor(){
		super();
	}

	constructView(viewRenderer){
		console.log("view");
		this._viewRenderer = viewRenderer;

	}

	listen(button){
		let signupView = this;
		button.addEventListener("click", function() {
			let signupForm = document.getElementById("signup-container");
			if (signupForm == undefined){
				let parent = document.getElementsByTagName('body')[0];
				let signup = new View(signupView._viewRenderer, "signup-template", parent);
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
				console.log(signupForm);
				signupView.listenToSubmit(signupForm);
			}
		});

	}

	listenToSubmit(signupForm) {
		let signupView = this;
		let submitButton = signupForm.getElementsByTagName("button")[0];
		submitButton.addEventListener("click", function() {
			console.log("click");
			signupView.parse(signupForm);
		});
	}

	parse(signupForm) {
		let inputFields = signupForm.getElementsByTagName("input");
		console.log(inputFields);
		let select = signupForm.getElementsByTagName("select")[0];
		let selectedContinent = select.options[select.selectedIndex].text;
		console.log(selectedContinent);

		let email = inputFields[0].value;
		console.log(email);
		let name = inputFields[1].value;
		console.log(name);
		let age = inputFields[2].value;
		console.log(age);
		let password = inputFields[3].value;
		console.log(password);

		let jsonToSend = {
			"email" : email, 
			"name" : name,
			"age" : age,
			"location" : selectedContinent,
			"password" : password
		}

		lib.sendJson(jsonToSend, "/signup.json", function(json) {
			console.log(json);
			if (json["status"] == "success") {
				let newUrl = "user=" + json["id"];
				window.location = "#" + newUrl;
			}
		});

	}
}

module.exports = SignupView;