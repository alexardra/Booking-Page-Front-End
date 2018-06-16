let FlightsView = require("./flights-view.js");
let HotelsView = require("./hotels-view.js");

class ViewFactory {

    createView(type, args) {
        switch(type) {
            case "hotels":
                return new HotelsView();
            case "flights":
                return new FlightsView();
        }
    }
}

module.exports = ViewFactory;