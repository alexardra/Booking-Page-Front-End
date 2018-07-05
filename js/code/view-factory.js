let FlightsView = require("./flights-view.js");
let HotelsView = require("./hotels-view.js");
let RentalsView = require("./rentals-view.js");
let RestaurantsView = require("./restaurants-view.js");
let HotelView = require("./hotel-view.js");
let RestaurantView = require("./restaurant-view.js");
let FlightView = require("./flight-view");
let RentalView = require("./rental-view.js");
let ThingstodoView = require("./things-to-do-view.js");
let DestinationsView = require("./destinations-view.js");

class ViewFactory {

    createView(type, args) {
        switch(type) {
            case "hotels":
                return new HotelsView();
            case "flights":
                return new FlightsView();
            case "rentals":
            	return new RentalsView();
            case "restaurants":
                return new RestaurantsView();
            case "things-to-do":
                return new ThingstodoView();
            case "restaurant":
                return new RestaurantView(args[0]);
            case "hotel":
                return new HotelView(args[0]);
            case "flight":
                return new FlightView(args[0]);
            case "rental":
                return new RentalView(args[0]);
            case "destinations":
                return new DestinationsView();
        }
    }
}

module.exports = ViewFactory;