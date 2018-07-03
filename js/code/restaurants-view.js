let View = require("./view.js");
let lib = require("./library.js");
let Multi = require("./multi-inheritance.js");
let Search = require("./search.js");
let Visuals = require("./visual.js");


class RestaurantsView extends Multi.inherit(View,Search) {

    constructor() {
        super();
        this.constructSearchJson();
    }

    constructView(viewRenderer) {
        this._viewRenderer = viewRenderer;
        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "restaurants-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        navigationPage.renderView();

        Visuals.renderAdditionalsSection(viewRenderer,navigationPage);
        Visuals.renderBrowseSection(viewRenderer,navigationPage,"destinations.json");

        this.listenToEvents();
        this.listenToSearchInput(searchBar);
    }

    constructSearchJson() {
        this._searchJson = {
            "search type": "restaurants", 
            "destination": ""
        }
        this._searchResultJson = null;
    }

    parseSearchBar() {
        let todoView = this;

        let destinationSearch = document.querySelector("#maxlength-search input");
        console.log(destinationSearch);
        let searchValue = destinationSearch.value;
        if (searchValue != "") {
            todoView._searchJson["destination"] = searchValue;
            return true;
        } 
        return false;
    }

    listenToEvents() {
        let todoView = this;

        document.getElementById("submit-search").addEventListener("click", function() {
            if (todoView.parseSearchBar()) {
                lib.sendJson(todoView._searchJson, "/searchjson.json", function(json) {
                    console.log(json);
                    todoView._searchResultJson = json;
                    let newUrl = "todo=" + json["destination"];
                    window.location = "#" + newUrl;
                });
            }
        });
    }

    listenToSearchInput(searchBar)  {
        let todoView = this;
        let searchInput = document.querySelector("#maxlength-search input")

        searchInput.addEventListener("focus", function() {
            console.log("focus");

            let jsonToSend = {"search type" : "restaurants"};
            lib.sendJson(jsonToSend,"/searchinput.json", function(json) {
                todoView.showOneDropdown(document.getElementById("todo-search-dropdown"));
                let recentlyViewedElem = new View(todoView._viewRenderer, "recently-viewed-elem", "dropdown-elements-container", 2,"recently viewed info",json);
                searchBar.addChildView(recentlyViewedElem);
                recentlyViewedElem.renderView();
    
                let recentlyViewedDomElems = document.getElementsByClassName("search-recently-viewed");
                for (let i = 0; i < recentlyViewedDomElems.length; i++) {
                    recentlyViewedDomElems[i].addEventListener("mousedown", function(event) {
                        console.log("click");
                        event.preventDefault();
                        let recentlyViewedElemValue = this.getElementsByTagName("div")[0].innerHTML;
                        searchInput.value = recentlyViewedElemValue;
                        todoView.removeSearchbarDropdown(searchBar);
                    }); 
                }
            });
        });

        searchInput.addEventListener("blur", function() {
            todoView.removeSearchbarDropdown(searchBar);
        });
    }

    removeSearchbarDropdown(searchBar) {
        let dropdowns = document.getElementById("search-bar").getElementsByClassName("dropdown");
        let numDropdowns = dropdowns.length;

        for (let i = 0; i < numDropdowns; i++) {
            if (!lib.hasClass(dropdowns[i], "hidden")) {
                lib.addClass(document.getElementById("todo-search-dropdown"),"hidden"); // not quite right
        
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


module.exports = RestaurantsView;