var View = require("./view.js");
let lib = require("./library.js");
let Multi = require("./multi-inheritance.js");
let Search = require("./search.js");
let Visuals = require("./visual.js");



class FlightsView extends Multi.inherit(View,Search) {

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
        console.log("change to flights view");

        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "flights-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);

        let flightsDestination = new View(viewRenderer,"flights-destination-template","flight-search",2);
        searchBar.addChildView(flightsDestination);

        let otherFilterDropdownSelectMenu = new View(viewRenderer, "select-menu-template", "other-dropdown");
        searchBar.addChildView(otherFilterDropdownSelectMenu);
        let otherFilterDropdown = new View(viewRenderer, "other-filter-dropdown-elem", "other-dropdown", 3, "dropdown details");
        searchBar.addChildView(otherFilterDropdown);

        navigationPage.renderView();

        Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
        Visuals.renderBrowseSection(viewRenderer,navigationPage,"destinations.json");

        this.formatCalendarInSearchBar();
        this.listenToEvents();
        this.listenToSearchInput(searchBar);
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
            flightsView._searchJson["adults number"] = this.getSearchOptionsInfo(otherSearchOptions[0]);
            flightsView._searchJson["senior number"] = this.getSearchOptionsInfo(otherSearchOptions[1]);
            flightsView._searchJson["children number"] = this.getSearchOptionsInfo(otherSearchOptions[2]);

            return true;
        }
        return false;
    }

    listenToEvents(){
        let flightsView = this;
        document.getElementById("submit-search").addEventListener("click", function() {
            console.log("submit");
            if (flightsView.parseSearchBar()) {
                lib.sendJson(flightsView._searchJson, "/searchjson.json", function(json) {
                    console.log(json);
                    flightsView._searchResultJson = json;
                    let newUrl = "destination=" + json["name"];
                    window.location = "#" + newUrl;
                });
            }
        });
        
		document.getElementById("other-content").onclick = function() {
            flightsView.toggleDropdown(document.getElementById("other-dropdown"));
            console.log("toggle");		
        }

        document.getElementsByTagName("select")[0].addEventListener("change", function() {
            console.log('b');
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
				lib.changeHtml(textPlaceholder,flightsView.generateTextInDropdown(buttonClass,text));
			}
		}
    }


    listenToSearchInput(searchBar) {
        let flightsView = this;

        let destinationSearchbars = document.querySelectorAll("#search-bar input[type='text']");
        let numDestinationSearchbars = destinationSearchbars.length;

        let dropdownParent;

        for (let i = 0; i < numDestinationSearchbars; i++) {
            destinationSearchbars[i].addEventListener("focus", function() {
                let searchInput = this;

                console.log("focus flight");

                let jsonToSend = {"search type" : "flights"};
                lib.sendJson(jsonToSend,"/searchinput.json", function(json) {

                    let siblings = searchInput.parentNode.childNodes;
                    let numSiblings = siblings.length;
                    for (let i = 0; i < numSiblings; i++) {
                        if (siblings[i].tagName == "DIV") {
                            dropdownParent = siblings[i].getElementsByTagName("div")[0];
                            break;
                        }   
                    }

                    let recentlyViewedElem = new View(flightsView._viewRenderer, "recently-viewed-elem", dropdownParent, 2,"recently viewed info",json);
                    searchBar.childViews[0].addChildView(recentlyViewedElem);
                    recentlyViewedElem.renderView();

                    flightsView.showOneDropdown(dropdownParent.parentNode);
                });


            });

            destinationSearchbars[i].addEventListener("blur", function() {
                console.log("blur");

                if (dropdownParent) {
                    flightsView.removeSearchbarDropdown(searchBar,dropdownParent);
                }
            });
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