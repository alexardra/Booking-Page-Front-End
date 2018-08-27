let Router = require("./router.js").Router;
let lib = require("./library.js");
let ViewRenderer = require("./view-renderer.js");
let HotelsView = require("./hotels-view.js");
let FlightsView = require("./flights-view.js");
let ViewFactory = require("./view-factory.js");
let RentalsView = require("./rentals-view.js");
let RestaurantsView = require("./restaurants-view.js");
let AuthentificationView = require("./authentification-view.js");

let RestaurantView = require("./restaurant-view.js");

class RoutController {

    constructor(templates, data) {
        Router.config({mode: "hash"});
        Router.navigate();	
        Router.listen();

        this._templates = templates;
        this._data = data;
        this.constructRouts();

        this._viewFactory = new ViewFactory();
        this._currentRout = null;
    }

    constructRouts() {

        this.constructStartRout();

        let routController = this;

        let cachedJson;
        lib.getJsonWithFetch("/restaurant.json", function(json) {
            cachedJson = json;
        });

        let cachedDestinationJson; 
        lib.getJsonWithFetch("/destinations.json", function(json) {
            cachedDestinationJson = json;
        });

        Router.add("hotels", function() {
            let hotelsView = routController._viewFactory.createView("hotels");

            if (routController._currentRout == null) { // start rout not constructed
                let viewRenderer = new ViewRenderer(routController._templates, routController._data, hotelsView);
                AuthentificationView(viewRenderer);
                routController._viewRenderer = viewRenderer; 
            } else {
                routController._viewRenderer.changeView(hotelsView);
            }
            routController._viewRenderer.addCurrentPageIndentifier("hotels");
            routController._currentRout = hotelsView;
        });

        Router.add("destination", function() {
            let infoJson = routController._currentRout._searchResultJson;
            let section = document.getElementsByClassName("current-page")[0].innerHTML.trim().toLocaleLowerCase();
            section = section.substring(section.indexOf(" ") + 1,section.length - 1);
            let destinationsView = routController._viewFactory.createView("destinations",[cachedDestinationJson,section]);
            routController._viewRenderer.changeView(destinationsView);
            routController._currentRout = destinationsView;
        });

        Router.add("hotel", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[cachedJson]));
        });

        
        Router.add("about", function() {
            lib.getJsonWithFetch("about.json", function(data) {
                routController._viewRenderer.changeView(routController._viewFactory.createView("about",[data])); 
            });
        });
        
        Router.add("flights", function() {
            let flightsView = routController._viewFactory.createView("flights");
            routController._viewRenderer.changeView(flightsView);
            routController._viewRenderer.addCurrentPageIndentifier("flights");
            routController._currentRout = flightsView;
        });

        Router.add("flight", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[cachedJson]));
        });

        Router.add("rentals", function() {
            let rentalsView = routController._viewFactory.createView("rentals");
            routController._viewRenderer.changeView(rentalsView);
            routController._viewRenderer.addCurrentPageIndentifier("rentals");
            routController._currentRout = rentalsView;
        });

        Router.add("rental", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[cachedJson]));
        });

        Router.add("restaurants", function() {
            let restaurantsView = routController._viewFactory.createView("restaurants");
            routController._viewRenderer.changeView(restaurantsView);
            routController._viewRenderer.addCurrentPageIndentifier("restaurants");
            routController._currentRout = restaurantsView;
        });

        Router.add("restaurant", function() {
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[infoJson]));
        });

        Router.add("things-to-do", function() {
            let thingsToDoView = routController._viewFactory.createView("things-to-do");
            routController._viewRenderer.changeView(thingsToDoView);
            routController._viewRenderer.addCurrentPageIndentifier("things-to-do");
            routController._currentRout = thingsToDoView;          
        });

        Router.add("todo", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[cachedJson]));
        });

        Router.add("user", function() {
            let currentUrl = window.location.href;
            let id = currentUrl.substring(currentUrl.indexOf("=") + 1);
            let userView = routController._viewFactory.createView("user", [id]);
            routController._viewRenderer.changeView(userView);
        });


        /* restaurant routs  - inside page navigation */

        Router.add("overview", function() {
            document.getElementById("overview").scrollIntoView({behavior: 'smooth', block: 'start' });
            window.scrollBy(0, -100);
        });


        Router.add("#details", function() {
            document.getElementById("details").scrollIntoView();
        });

        Router.add("#nearby", function() {
            document.getElementById("nearby").scrollIntoView();
        });

        Router.add("#qna", function() {
            document.getElementById("qna").scrollIntoView();
        });

        /***********************************/
    }

    constructStartRout() {
        Router.navigate("hotels");
    }

}

module.exports = RoutController;