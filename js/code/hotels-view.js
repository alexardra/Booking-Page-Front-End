let View = require("./view.js");

class HotelsView extends View {

    constructor() {
        super();
        console.log("maybe something could happen here");
    }

    // should be render view (?)
    constructView(viewRenderer) {
        let navigationPage = new View(viewRenderer, "navigation-page", "app");

        let searchBar = new View(viewRenderer, "search-bar-template", "cover");

        navigationPage.addChildView(searchBar);

        let recentlyViewedDropdown = new View(viewRenderer, "recently-viewed-dropdown","search-container");
        searchBar.addChildView(recentlyViewedDropdown);

        let recentlyViewedElem = new View(viewRenderer, "recently-viewed-elem", "search-dropdown", 2,"recently viewed info");
        recentlyViewedDropdown.addChildView(recentlyViewedElem);

        let otherFilterDropdown = new View(viewRenderer, "other-filter-dropdown-elem", "other-dropdown", 3, "dropdown details");
        searchBar.addChildView(otherFilterDropdown);

        let calendarDropdown = new View(viewRenderer, "calendar-dropdown", "calendar-container");
        searchBar.addChildView(calendarDropdown);

        navigationPage.renderView();
    }
}

module.exports = HotelsView;