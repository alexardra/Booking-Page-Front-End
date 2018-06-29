var View = require("./view.js");
let lib = require("./library.js");

class FlightsView extends View {

    constructor() {
        super();
        this.constructSearchJson();
    }
    constructSearchJson() {
        this._searchJson = {
            "search type": "flight", 
            "from": "",
            "where": "",
            "departure date": "",
            "return date": "",
            "person numb": ""
        }
        this._searchResultJson = null;

    }

    constructView(viewRenderer) {
        console.log("change to flights view");

        let navigationPage = new View(viewRenderer, "navigation-page", "app");
        let searchBar = new View(viewRenderer, "flights-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        
        navigationPage.renderView();
        this.listenToEvents();
    }

    listenToEvents(){
        let flightsView = this;
        document.getElementsByClassName("submit-search")[0].addEventListener("click", function() {
            let form = document.getElementById("search_bar");
            let input = form.querySelectorAll("input[type='text']"); // just one search input
            let from = input[0].value;
            let where = input[1].value;
            if  (from != "" && where != ""){
                flightsView._searchJson["from"] = from;
                flightsView._searchJson["where"] = from;
                lib.sendJson(flightsView._searchJson, "/searchjson.json", function(json) {
                    flightsView._searchResultJson = json;
                    let newUrl = "flight=" + from + "->" + where;
                    window.location = "#" + newUrl;
                });
            }
        });
        
    }
}

module.exports = FlightsView;