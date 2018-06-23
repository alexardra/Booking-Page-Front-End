let View = require("./view.js");
let lib = require("./library.js");

class RestaurantsView extends View {

    constructor() {
        super();
    }

    constructView(viewRenderer) {
        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "restaurants-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        navigationPage.renderView();

    }
}


module.exports = RestaurantsView;