let View = require("./view.js");
let lib = require("./library.js");

class RestaurantView extends View {

    constructor(info) {
        super();
    }


    constructView(viewRenderer) {
        console.log("construct restaurant view");
    }
}

module.exports = RestaurantView;