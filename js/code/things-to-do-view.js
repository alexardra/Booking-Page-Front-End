let View = require("./view.js");
let lib = require("./library.js");

class ThingstodoView extends View {

    constructor() {
        super();
        this.constructSearchJson();
    }
    constructSearchJson() {
        this._searchJson = {
            "search type": "things to do", 
            "destination" : "",
        }
        this._searchResultJson = null;

    }

    constructView(viewRenderer) {
        console.log("----");
        let navigationPage = new View(viewRenderer, "navigation-page", "app");

        let searchBar = new View(viewRenderer, "thingstodo-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        navigationPage.renderView();

        this.listenToEvents();
    }

    listenToEvents() {
        let todoView = this;
        document.getElementsByClassName("submit-search")[0].addEventListener("click", function() {
            let form = document.getElementById("search_bar");
            let input = form.querySelector("input[type='text']"); 
            let dest = input.value;
            if (dest != ""){
                todoView._searchJson["destination"] = dest;
                lib.sendJson(rentalsView._searchJson, "/searchjson.json", function(json) {
                    rentalsView._searchResultJson = json;
                    let newUrl = "rental=" + dest;
                    window.location = "#" + newUrl;
                });
            }
        });
    }


}

module.exports = ThingstodoView;