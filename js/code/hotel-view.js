let View = require("./view.js");
let lib = require("./library.js");

class HotelView extends View {

    constructor(info) {
        super();
        this._info = info;
    }

    constructView(viewRenderer) {
       
    }
}


module.exports = HotelView;