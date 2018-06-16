let Router = require("./router.js").Router;
let lib = require("./library.js");
let ViewRenderer = require("./view-renderer.js");
let HotelsView = require("./hotels-view.js");
let FlightsView = require("./flights-view.js");
let ViewFactory = require("./view-factory.js");


class RoutController {

    constructor(templates, data) {
        Router.config({mode: "hash"});
        Router.navigate();	
        Router.listen();

        this._templates = templates;
        this._data = data;
        this.constructRouts();

        this._viewFactory = new ViewFactory();
    }

    constructRouts() {

        this.constructStartRout();

        let routController = this;

        Router.add("hotels", function() {
            console.log("hotels");  
            routController._viewRenderer.changeView(routController._viewFactory.createView("hotels"));
        });
        
        Router.add("about", function() {
            console.log("change to about page");    
        });
        
        Router.add("flights", function() {
            routController._viewRenderer.changeView(routController._viewFactory.createView("flights"));
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