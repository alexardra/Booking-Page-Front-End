let View = require("./view.js");
let lib = require("./library.js");
let Multi = require("./multi-inheritance.js");
let Search = require("./search.js");
let Visuals = require("./visual.js");


class RentalsView extends View {

    constructor() {
        super();
        this.constructSearchJson();
    }
    
    constructSearchJson() {
        this._searchJson = {
            "search type": "rental", 
            "destination" : "",
            "date from": "",
            "date to": ""
        }
        this._searchResultJson = null;

    }

    constructView(viewRenderer) {
        this._viewRenderer = viewRenderer;
        let navigationPage = new View(viewRenderer, "navigation-page", "app");

        let searchBar = new View(viewRenderer, "rentals-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);

        navigationPage.renderView();


        let cover = document.getElementById("cover");
        let elem = lib.removeClass(cover);
        lib.addClass(lib.removeClass(cover), "rentals-background");

        Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
        Visuals.renderBrowseSection(viewRenderer,navigationPage,"destinations.json");

        Search.formatCalendarInSearchBar();
        this.listenToEvents();
        this.listenToSearchInput(searchBar);
    }

    // if parsed successfully returns true, otherwise false.
    // success - destinations input not empty
    parseSearchBar() {
        let rentalsView = this;

        let destinationSearch = document.getElementById("search-input");
        let searchValue = destinationSearch.value;
        if (searchValue != "") {
            rentalsView._searchJson["destination"] = searchValue;
            
            let dates = document.querySelectorAll("input[type='date']");
            rentalsView._searchJson["date from"] = dates[0].value;
            rentalsView._searchJson["date to"] = dates[1].value;

            return true;
        } 
        return false;
    }


    listenToEvents() {
        let rentalsView = this;
        document.getElementById("submit-search").addEventListener("click", function() {
            console.log("submit");
            if (rentalsView.parseSearchBar()) {
                lib.sendJson(rentalsView._searchJson, "/searchjson.json", function(json) {
                    console.log(json);
                    rentalsView._searchResultJson = json;
                    let newUrl = "destination=" + json["name"];
                    window.location = "#" + newUrl;
                });
            }
        });
    }

    listenToSearchInput(searchBar) {
        let rentalsView = this; 
        // let recentlyViewedDropdown = searchBar.childViews[0];

        document.getElementById("search-input").addEventListener("focus", function() {
            console.log("focus");

            let searchInput = this;

            let jsonToSend = {"search type" : "rentals"};
            lib.sendJson(jsonToSend,"/searchinput.json", function(json) {

                Search.showOneDropdown(document.getElementById("rentals-search-dropdown"));

                let recentlyViewedElem = new View(rentalsView._viewRenderer, "recently-viewed-elem", "dropdown-elements-container", 2,"recently viewed info",json);
                searchBar.addChildView(recentlyViewedElem);
                recentlyViewedElem.renderView();

                let recentlyViewedDomElems = document.getElementsByClassName("search-recently-viewed");
                for (let i = 0; i < recentlyViewedDomElems.length; i++) {
                    recentlyViewedDomElems[i].addEventListener("mousedown", function(event) {
                        event.preventDefault();
                        let recentlyViewedElemValue = this.getElementsByTagName("div")[0].innerHTML;
                        searchInput.value = recentlyViewedElemValue;
                        rentalsView.removeSearchbarDropdown(searchBar);
                    }); 
                }

            });
        });

        document.getElementById("search-input").addEventListener("blur", function() {
            console.log("blur");
            rentalsView.removeSearchbarDropdown(searchBar);

        });
    }
    
    removeSearchbarDropdown(searchBar) {
        let dropdowns = document.getElementById("search-bar").getElementsByClassName("dropdown");
        let numDropdowns = dropdowns.length;

        for (let i = 0; i < numDropdowns; i++) {
            if (!lib.hasClass(dropdowns[i], "hidden")) {
                lib.addClass(document.getElementById("rentals-search-dropdown"),"hidden"); // not quite right
        
                // just one active dropdown == one child
                let dropdown = searchBar.childViews[0]
                let numChildren = dropdown.childViews.length;
        
                for (let i = 0; i < numChildren; i++) {
                    dropdown.childViews[i].removeView();
                }
                dropdown.removeView();
            }
        }
    }
}   


module.exports = RentalsView;