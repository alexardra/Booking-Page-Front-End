let View = require("./view.js");
let lib = require("./library.js");

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


        let additionalsContainer = new View(viewRenderer, "additionals-template", "additionals-container");

        let servicesList = new View(viewRenderer, "service-template", "services-container", 4, "services");
        additionalsContainer.addChildView(servicesList);

        navigationPage.addChildView(additionalsContainer);


        lib.getJsonWithFetch("destinations.json", function(data) {
            viewRenderer.addData(data);
            let browse = new View(viewRenderer, "browse-template", "browse", 5, "sections");
            navigationPage.addChildView(browse);
    
            navigationPage.renderView();

            let elements = document.getElementsByClassName("service-container");
            lib.addClass(elements[0].children[0],"service-discover-icon");
            lib.addClass(elements[1].children[0],"service-reviews-icon");
            lib.addClass(elements[2].children[0],"service-money-icon");
            lib.addClass(elements[3].children[0],"service-booking-icon");
        });

    }
}

module.exports = HotelsView;