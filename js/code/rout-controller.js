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
            console.log("hotels");  
            let hotelsView = routController._viewFactory.createView("hotels");
            routController._viewRenderer.changeView(hotelsView);
            routController._currentRout = hotelsView;
        });
        
        Router.add("about", function() {
            console.log("change to about page");    
        });
        
        Router.add("flights", function() {
            console.log(routController._currentRout);
            routController._viewRenderer.changeView(routController._viewFactory.createView("flights"));
        });

        Router.add("rentals", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("rentals"));
        });

        Router.add("restaurants", function() {
            let restaurantsView = routController._viewFactory.createView("restaurants");
            routController._viewRenderer.changeView(restaurantsView);
            routController._currentRout = restaurantsView;
            // console.log(routController._currentRout instanceof RestaurantsView);
        });

        Router.add("restaurant", function() {
            let infoJson = routController._currentRout._searchResultJson;
            let restaurant = routController._viewFactory.createView("restaurant",[infoJson]);
            // console.log(restaurant);
            routController._viewRenderer.changeView(routController._viewFactory.createView("restaurant",[infoJson]));
        });
    }

    constructStartRout() {
        // let startView = new HotelsView(); // starting view
        // let startView = new RentalsView(); 
        let startView = new RestaurantsView(); 
        Router.navigate("restaurants");
        let viewRenderer = new ViewRenderer(this._templates, this._data, startView);
        this._viewRenderer = viewRenderer;
        AuthentificationView(viewRenderer);

    }

}

module.exports = RoutController;