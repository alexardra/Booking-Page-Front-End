let View = require("./view.js");
let lib = require("./library.js");

class RentalView extends View{

	constructor(info){
		super();
		this._info = info;

	}

	constructView(viewRenderer){
		console.log("construct RentalView view");
	}
}

module.exports = RentalView;

