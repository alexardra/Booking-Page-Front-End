let View = require("./view.js");
let lib = require("./library.js");
let Multi = require("./multi-inheritance.js");
let Search = require("./search.js");
let Visuals = require("./visual.js");

class HotelsView extends Multi.inherit(View,Search)  {

    constructor() {
        super();
        this.constructSearchJson();
    }

    constructSearchJson() {
        this._searchJson = {
            "search type": "hotel", 
            "destination": "",
            "date from": "",
            "date to": "",
            "rooms number" : "",
            "adults number" : "",
            "children number" : ""
        }
        this._searchResultJson = null;
    }

    // if parsed successfully returns true, otherwise false.
    // success - destinations input not empty
    parseSearchBar() {
        let hotelsView = this;

        let destinationSearch = document.getElementById("search-input");
        let searchValue = destinationSearch.value;
        if (searchValue != "") {
            hotelsView._searchJson["destination"] = searchValue;
            
            let dates = document.querySelectorAll("input[type='date']");
            hotelsView._searchJson["date from"] = dates[0].value;
            hotelsView._searchJson["date to"] = dates[1].value;

            let otherSearchOptions = document.getElementsByClassName("other-filter-dropdown-elem");
            hotelsView._searchJson["rooms number"] = this.getSearchOptionsInfo(otherSearchOptions[0]);
            hotelsView._searchJson["adults number"] = this.getSearchOptionsInfo(otherSearchOptions[1]);
            hotelsView._searchJson["children number"] = this.getSearchOptionsInfo(otherSearchOptions[2]);

            return true;
        } 
        return false;
    }

    // should be render view (?)
    constructView(viewRenderer) {
        this._viewRenderer = viewRenderer;

        let navigationPage = new View(viewRenderer, "navigation-page", "app");

        let searchBar = new View(viewRenderer, "search-bar-template", "cover");

        navigationPage.addChildView(searchBar);

        let recentlyViewedDropdown = new View(viewRenderer, "recently-viewed-dropdown","search-container");
        searchBar.addChildView(recentlyViewedDropdown);

        let otherFilterDropdown = new View(viewRenderer, "other-filter-dropdown-elem", "other-dropdown", 3, "dropdown details");
        searchBar.addChildView(otherFilterDropdown);

        navigationPage.renderView();

        Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
        Visuals.renderBrowseSection(viewRenderer,navigationPage,"destinations.json", "hotel");

        this.formatCalendarInSearchBar();
        this.listenToEvents();
        this.listenToSearchInput(searchBar);
    }

    listenToEvents() {
        let hotelsView = this;
        document.getElementById("submit-search").addEventListener("click", function() {
            if (hotelsView.parseSearchBar()) {
                lib.sendJson(hotelsView._searchJson, "/searchjson.json", function(json) {
                    console.log(json);
                    hotelsView._searchResultJson = json;
                    let newUrl = "destination=" + json["name"];
                    window.location = "#" + newUrl;
                });
            }
        });

		document.getElementById("other-content").onclick = function() {
			hotelsView.toggleDropdown(document.getElementById("other-dropdown"));		
        }
        
        let plusMinusIcons = document.querySelectorAll(".plus_icon, .minus_icon");
		for (var i = 0; i < plusMinusIcons.length; i++) {
			plusMinusIcons[i].onclick = function() {
				var buttonClass = this.className;
				var textPlaceholder = this.parentNode.querySelector("span");
				var text = textPlaceholder.innerHTML;
				lib.changeHtml(textPlaceholder,hotelsView.generateTextInDropdown(buttonClass,text,true));
			}
		}
    }

    listenToSearchInput(searchBar) {
        let hotelsView = this; 
        let recentlyViewedDropdown = searchBar.childViews[0];

        document.getElementById("search-input").addEventListener("focus", function() {
            console.log("focus");

            let searchInput = this;

            let jsonToSend = {"search type" : "hotels"};
            lib.sendJson(jsonToSend,"/searchinput.json", function(json) {

                hotelsView.showOneDropdown(document.getElementById("search-dropdown"));

                let recentlyViewedElem = new View(hotelsView._viewRenderer, "recently-viewed-elem", "dropdown-elements-container", 2,"recently viewed info",json);
                recentlyViewedDropdown.addChildView(recentlyViewedElem);
                recentlyViewedElem.renderView();

                let recentlyViewedDomElems = document.getElementsByClassName("search-recently-viewed");
                for (let i = 0; i < recentlyViewedDomElems.length; i++) {
                    recentlyViewedDomElems[i].addEventListener("mousedown", function(event) {
                        event.preventDefault();
                        let recentlyViewedElemValue = this.getElementsByTagName("div")[0].innerHTML;
                        searchInput.value = recentlyViewedElemValue;
                        hotelsView.removeSearchbarDropdown(searchBar);
                    }); 
                }

            });
        });

        document.getElementById("search-input").addEventListener("blur", function() {
            console.log("blur");
            hotelsView.removeSearchbarDropdown(searchBar);
        });
    }

    removeSearchbarDropdown(searchBar) {
        let dropdowns = document.getElementById("search-bar").getElementsByClassName("dropdown");
        let numDropdowns = dropdowns.length;

        for (let i = 0; i < numDropdowns; i++) {
            if (!lib.hasClass(dropdowns[i], "hidden")) {
                lib.addClass(document.getElementById("search-dropdown"),"hidden"); // not quite right
        
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

module.exports = HotelsView;