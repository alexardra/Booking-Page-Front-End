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
            console.log("destinations");
            let destinationsView = routController._viewFactory.createView("destinations");
            routController._viewRenderer.changeView(destinationsView);
            // routController._viewRenderer.addCurrentPageIndentifier("flights");
            routController._currentRout = destinationsView;
        });

        Router.add("hotel", function() {
            console.log(routController._currentRout);
            let infoJson = routController._currentRout._searchResultJson;
            console.log(infoJson);
            routController._viewRenderer.changeView(routController._viewFactory.createView("hotel",[infoJson]));
        });

        
        Router.add("about", function() {
            console.log("change to about page");    
        });
        
        Router.add("flights", function() {
            let flightsView = routController._viewFactory.createView("flights");
            routController._viewRenderer.changeView(flightsView);
            routController._viewRenderer.addCurrentPageIndentifier("flights");
            routController._currentRout = flightsView;
        });

        Router.add("flight", function() {
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("flight",[infoJson]));
        });

        Router.add("rentals", function() {
            console.log(routController._currentRout);
            let rentalsView = routController._viewFactory.createView("rentals");
            routController._viewRenderer.changeView(rentalsView);
            routController._viewRenderer.addCurrentPageIndentifier("rentals");
            routController._currentRout = rentalsView;
        });

        Router.add("rental", function() {
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("rental",[infoJson]));
        });

        Router.add("restaurants", function() {
            console.log(routController._currentRout);
            let restaurantsView = routController._viewFactory.createView("restaurants");
            routController._viewRenderer.changeView(restaurantsView);
            routController._viewRenderer.addCurrentPageIndentifier("restaurants");
            routController._currentRout = restaurantsView;
        });

        Router.add("restaurant", function() {
            console.log(routController._currentRout);
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[infoJson]));
        });


        /* restaurant routs  - inside page navigation */

        Router.add("overview", function() {
            console.log("-----");
            document.getElementById("overview").scrollIntoView({behavior: 'smooth', block: 'start' });
            console.log("-----");
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

        Router.add("things-to-do", function() {
            let thingsToDoView = routController._viewFactory.createView("things-to-do");
            routController._viewRenderer.changeView(thingsToDoView);
            routController._viewRenderer.addCurrentPageIndentifier("things-to-do");
            routController._currentRout = thingsToDoView;          
        });
    }

    constructStartRout() {
        Router.navigate("hotels");
    }

}

module.exports = RoutController;