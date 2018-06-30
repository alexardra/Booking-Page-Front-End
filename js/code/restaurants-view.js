let View = require("./view.js");
let lib = require("./library.js");

class RestaurantsView extends View {

    constructor() {
        super();
        this.constructSearchJson();
    }

    constructView(viewRenderer) {
        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "restaurants-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        navigationPage.renderView();

        this.listenToEvents();
    }

    constructSearchJson() {
        this._searchJson = {
            "search type": "restaurants", 
            "destination": ""
        }
        this._searchResultJson = null;
    }

    listenToEvents() {
        let resturantsView = this;
        document.getElementById("submit-search").addEventListener("click", function() {

            let form = document.getElementById("search_bar");
            let input = form.querySelector("input[type='text']"); // just one search input

            let searchValue = input.value;
            if (searchValue != "") {
                resturantsView._searchJson["destination search"] = searchValue;

                lib.sendJson(resturantsView._searchJson, "/searchjson.json", function(json) {
                    resturantsView._searchResultJson = json;
                    let newUrl = "restaurant=" + searchValue;
                    window.location = "#" + newUrl;
                });

            }
            
        });
    }

    
}


module.exports = RestaurantsView;