var View = require("./view.js");
let lib = require("./library.js");
let Multi = require("./multi-inheritance.js");
let Search = require("./search.js");
let Visuals = require("./visual.js");

class FlightsView extends View {

    constructor() {
        super();
        this.constructSearchJson();
    }
    constructSearchJson() {
        this._searchJson = {
            "search type": "flight", 
            "from": "",
            "to": "",
            "date from": "",
            "date to": "",
            "adults number": "", 
            "senior number": "", 
            "children number": "", 
            "flight type" : ""
        }
        this._searchResultJson = null;

    }

    constructView(viewRenderer) {
        this._viewRenderer = viewRenderer;

        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "flights-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);

        let flightsDestination = new View(viewRenderer,"flights-destination-template","flight-search", 2, "destinations");

        // let flightsDestination = new View(viewRenderer,"flights-destination-template","flight-search", 2);
        searchBar.addChildView(flightsDestination);

        let otherFilterDropdownSelectMenu = new View(viewRenderer, "select-menu-template", "other-dropdown");
        searchBar.addChildView(otherFilterDropdownSelectMenu);
        let otherFilterDropdown = new View(viewRenderer, "other-filter-dropdown-elem", "other-dropdown", 3, "dropdown details");
        searchBar.addChildView(otherFilterDropdown);

        navigationPage.renderView();
        let cover = document.getElementById("cover");
        let elem = lib.removeClass(cover);
        lib.addClass(lib.removeClass(cover), "flights-background");


        Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
        Visuals.renderBrowseSection(viewRenderer,navigationPage,"destinations.json", "flight");

        Search.formatCalendarInSearchBar();
        this.listenToEvents();
    }

    // if parsed successfully returns true, otherwise false.
    // success - destinations input not empty
    parseSearchBar() {
        let flightsView = this;
        // from , to 
        let destinationSearch = document.querySelectorAll("#search-bar input[type='text']");

        if (destinationSearch[0].value != "" || destinationSearch[1].value != "") {
            flightsView._searchJson["from"] = destinationSearch[0].value;
            flightsView._searchJson["to"] = destinationSearch[1].value;

            let dates = document.querySelectorAll("input[type='date']");
            flightsView._searchJson["date from"] = dates[0].value;
            flightsView._searchJson["date to"] = dates[1].value;

            let flightType = document.querySelector("#other-content span").innerHTML;
            flightsView._searchJson["flight type"] = flightType;

            let otherSearchOptions = document.getElementsByClassName("other-filter-dropdown-elem");
            flightsView._searchJson["adults number"] = Search.getSearchOptionsInfo(otherSearchOptions[0]);
            flightsView._searchJson["senior number"] = Search.getSearchOptionsInfo(otherSearchOptions[1]);
            flightsView._searchJson["children number"] = Search.getSearchOptionsInfo(otherSearchOptions[2]);

            return true;
        }
        return false;
    }

    listenToEvents(){
        let flightsView = this;
        document.getElementById("submit-search").addEventListener("click", function() {
            if (flightsView.parseSearchBar()) {
                lib.sendJson(flightsView._searchJson, "/searchjson.json", function(json) {
                    flightsView._searchResultJson = json;
                    let newUrl = "destination=" + json["name"];
                    window.location = "#" + newUrl;
                });
            }
        });
        
		document.getElementById("other-content").onclick = function() {
            Search.toggleDropdown(document.getElementById("other-dropdown"));
        }

        document.getElementsByTagName("select")[0].addEventListener("change", function() {
            let select = document.getElementById("mainselection").getElementsByTagName("select")[0];
            let currentText = select.options[select.selectedIndex].text;
            let currentElement = document.querySelector("#other-content span")
            lib.changeHtml(currentElement,currentText);
        });

        let plusMinusIcons = document.querySelectorAll(".plus_icon, .minus_icon");
		for (var i = 0; i < plusMinusIcons.length; i++) {
			plusMinusIcons[i].onclick = function() {
				var buttonClass = this.className;
				var textPlaceholder = this.parentNode.querySelector("span");
				var text = textPlaceholder.innerHTML;
				lib.changeHtml(textPlaceholder,Search.generateTextInDropdown(buttonClass,text));
			}
		}
    }



    removeSearchbarDropdown(searchBar, searchDropdown) {
        let dropdowns = document.getElementById("search-bar").getElementsByClassName("dropdown");
        let numDropdowns = dropdowns.length;

        for (let i = 0; i < numDropdowns; i++) {
            if (!lib.hasClass(dropdowns[i], "hidden")) {
                lib.addClass(searchDropdown.parentNode,"hidden");  

                // let parentToRemove = searchBar.childViews[0];

                // just one active dropdown == one child
                let dropdown = searchBar.childViews[0]
                let numChildren = dropdown.childViews.length;

                for (let i = 0; i < numChildren; i++) {
                    dropdown.childViews[i].removeView();
                }
            }
        }

    }
}

module.exports = FlightsView;