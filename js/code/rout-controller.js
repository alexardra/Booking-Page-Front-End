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
            routController._viewRenderer.changeView(hotelsView);
            routController._currentRout = hotelsView;
        });

        Router.add("hotel", function() {
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("hotel",[infoJson]));
        });

        
        Router.add("about", function() {
            console.log("change to about page");    
        });
        
        Router.add("flights", function() {
            let flightsView = routController._viewFactory.createView("flights");
            routController._viewRenderer.changeView(flightsView);
            routController._currentRout = flightsView;
        
        });

        Router.add("flight", function() {
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("flight",[infoJson]));
        });

        Router.add("rentals", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("rentals"));
        });

        Router.add("restaurants", function() {
            let restaurantsView = routController._viewFactory.createView("restaurants");
            routController._viewRenderer.changeView(restaurantsView);
            routController._currentRout = restaurantsView;
        });

        Router.add("restaurant", function() {
            let infoJson = routController._currentRout._searchResultJson;
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[infoJson]));
        });


        /* restaurant routs  - inside page navigation */

        Router.add("#overview", function() {
            document.getElementById("overview").scrollIntoView();
        });

        Router.add("#reviews", function() {
            document.getElementById("reviews").scrollIntoView();
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
        let startView = new HotelsView(); // starting view
        // let startView = new RentalsView(); 
        // let startView = new RestaurantsView(); 
        Router.navigate("hotels");
        
        let routController = this;
        lib.getJsonWithFetch("restaurant.json", function(restaurant) {
            let startView = new RestaurantView(restaurant);
            let viewRenderer = new ViewRenderer(routController._templates, routController._data, startView);
            routController._viewRenderer = viewRenderer;
            AuthentificationView(viewRenderer);
        });
    }

}

module.exports = RoutController;