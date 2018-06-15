let Router = require("./router.js").Router;
let lib = require("./library.js");
let ViewRenderer = require("./view-renderer.js");
let HotelsView = require("./hotels-view.js");
let FlightsView = require("./flights-view.js");

class RoutController {

    constructor(templates, data) {
        Router.config({mode: "hash"});
        Router.navigate();	
        Router.listen();

        this._templates = templates;
        this._data = data;
        this.constructRouts();
    }

    constructRouts() {

        this.constructStartRout();

        let routController = this;

        Router.add("hotels", function() {
            console.log("hotels");  
        });
        
        Router.add("about", function() {
            console.log("change to about page");    
        });
        
        Router.add("flights", function() {
            let flightsView = new FlightsView(); 
            routController._viewRenderer.changeView(flightsView);
        });
    }

    constructStartRout() {
        // let startView = new HotelsView(); // starting view
        let startView = new FlightsView(); 
        let viewRenderer = new ViewRenderer(this._templates, this._data, startView);
        this._viewRenderer = viewRenderer;  
    }

}

module.exports = RoutController;