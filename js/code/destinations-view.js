let View = require("./view.js");
let lib = require("./library.js");

class DestinationsView extends View {

	constructor(info){
		super();
		this._info = info; // json to render 

	}

	constructView(viewRenderer){
        console.log("destinations view");
	}
}

module.exports = DestinationsView;
