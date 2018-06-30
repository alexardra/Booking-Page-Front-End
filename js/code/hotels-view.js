let View = require("./view.js");
let lib = require("./library.js");

class HotelsView extends View {

    constructor() {
        super();
        this.constructData();
        this.constructSearchJson();
    }

    constructSearchJson() {
        this._searchJson = {
            "search type": "hotel", 
            "hotel name": "",
            "hotel data": "",
            "guests number": ""
        }
        this._searchResultJson = null;
    }

    constructData() {
        let thisView = this;
        lib.getJsonWithFetch("destinations.json", function(data) {
            thisView._data = data;
        });
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
        navigationPage.renderView();

        // lib.getJsonWithFetch("destinations.json", function(data) {
        //     viewRenderer.addData(data);
        //     let browse = new View(viewRenderer, "browse-template", "browse", 5, "sections");
        //     navigationPage.addChildView(browse);
    
        //     navigationPage.renderView();

        //     let elements = document.getElementsByClassName("service-container");
        //     lib.addClass(elements[0].children[0],"service-discover-icon");
        //     lib.addClass(elements[1].children[0],"service-reviews-icon");
        //     lib.addClass(elements[2].children[0],"service-money-icon");
        //     lib.addClass(elements[3].children[0],"service-booking-icon");
        // });
        
        console.log(this._data);
        console.log("--");

        let browse = new View(viewRenderer, "browse-template", "browse", 5, "sections", this._data);
        navigationPage.addChildView(browse);
    
        navigationPage.renderView();

        let elements = document.getElementsByClassName("service-container");
        lib.addClass(elements[0].children[0],"service-discover-icon");
        lib.addClass(elements[1].children[0],"service-reviews-icon");
        lib.addClass(elements[2].children[0],"service-money-icon");
        lib.addClass(elements[3].children[0],"service-booking-icon");


        this.listenToEvents();

    }

    listenToEvents(){
        let hotelsView = this;
        document.getElementById("submit-search").addEventListener("click", function() {
            let form = document.getElementById("search_bar");
            let input = form.querySelector("input[type='text']"); 
            let searchValue = input.value;
            if (searchValue != "") {
                hotelsView._searchJson["hotel name"] = searchValue;
                lib.sendJson(hotelsView._searchJson, "/searchjson.json", function(json) {
                    hotelsView._searchResultJson = json;
                    let newUrl = "hotel=" + searchValue;
                    window.location = "#" + newUrl;
                });

            }

        });

    }

}

module.exports = HotelsView;