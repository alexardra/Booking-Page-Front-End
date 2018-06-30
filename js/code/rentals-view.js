let View = require("./view.js");
let lib = require("./library.js");
class RentalsView extends View {

    constructor() {
        super();
        this.constructSearchJson();
    }
    constructSearchJson() {
        this._searchJson = {
            "search type": "rental", 
            "destination" : "",
            "from" : "", 
            "to" : ""
        }
        this._searchResultJson = null;

    }

    constructView(viewRenderer) {
        let navigationPage = new View(viewRenderer, "navigation-page", "app");

        let searchBar = new View(viewRenderer, "rentals-search-bar-template", "cover");
        navigationPage.addChildView(searchBar);
        navigationPage.renderView();
        let cover = document.getElementById("cover");
        let elem = lib.removeClass(cover);
        lib.addClass(lib.removeClass(cover), "rentals-background");
        this.listenToEvents();
    }

    listenToEvents() {
        let rentalsView = this;
        document.getElementsByClassName("submit-search")[0].addEventListener("click", function() {
            let form = document.getElementById("search_bar");
            let input = form.querySelector("input[type='text']"); 
            let dest = input.value;
            if (dest != ""){
                rentalsView._searchJson["destination"] = dest;
                lib.sendJson(rentalsView._searchJson, "/searchjson.json", function(json) {
                    rentalsView._searchResultJson = json;
                    let newUrl = "rental=" + dest;
                    window.location = "#" + newUrl;
                });
            }
        });
    }
}   


module.exports = RentalsView;