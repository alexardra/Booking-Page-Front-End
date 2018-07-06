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
				lib.addClass(document.getElementById("app"), "faded");
			}
		});

	}
}

module.exports = SignupView;