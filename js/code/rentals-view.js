let View = require("./view.js");
let lib = require("./library.js");
class RentalsView extends View {

    constructor() {
        super();
    }

    constructView(viewRenderer) {
        let navigationPage = new View(viewRenderer, "navigation-page", "app");

        let searchBar = new View(viewRenderer, "rentals-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        navigationPage.renderView();
        let cover = document.getElementById("cover");
        lib.addClass(lib.removeClass(cover), "rentals-background");
    }
}


module.exports = RentalsView;