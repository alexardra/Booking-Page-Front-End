var View = require("./view.js");

class FlightsView extends View {

    constructor() {
        super();
    }

    constructView(viewRenderer) {
        console.log("change to flights view");

        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "flights-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        
        navigationPage.renderView();
    }
}

module.exports = FlightsView;