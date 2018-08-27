let View = require("./view.js");
let lib = require("./library.js");

class FlightView extends View{

	constructor(info){
		super();
		this._info = info;

	}

	constructView(viewRenderer){
		console.log("construct flight view");
	}
}

module.exports = FlightView;
