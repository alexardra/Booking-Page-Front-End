var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

/* Static resources - styles, images, etc. */
app.use(express.static('js/code'));
app.use(express.static('css'));
app.use(express.static('resources'));
app.use(express.static('dist'));

/* Request main page */
app.get("/", function(req,res) {
	res.sendFile(__dirname + "/html/index.html");
});

/* Should be ajax requests on additional resources */
const destinations = require("./js/data/destinations.json");
app.get("/destinations.json", function(req,res) {
	res.json(destinations);
});

const data = require("./js/data/data.json");
app.get("/data.json", function(req,res) {
	res.json(data);
});

app.get("/templates.html", function(req,res) {
	res.sendFile(__dirname + "/html/templates.html");
});

const users = require("./js/data/users.json");
app.post("/users.json", function(req,res) {
	res.json(users);
});

const restaurant = require("./js/data/restaurant.json");
const hotel = require("./js/data/hotel.json");
const flight = require("./js/data/flight.json");
const rental = require("./js/data/rental.json");
const todo = require("./js/data/todo.json");
app.post("/searchjson.json", function(req, res) {
	let searchJson = req.body; // json object
	if (searchJson["search type"] == "restaurants") {
		res.json(restaurant);
	} else
	if (searchJson["search type"] == "hotel") {
		res.json(hotel);
	} else
	if (searchJson["search type"] == "flight") {
		res.json(flight);
	} else
	if (searchJson["search type"] == "rental") {
		res.json(rental);
	} else 
	if (searchJson["search type"] == "things to do") {
		res.json(todo);
	}
});

app.post("/searchinput.json", function(req,res) {

	let searchJson = req.body;
	if (searchJson["search type"] == "hotels") {
		let jsonToSend = {	
			"recently viewed info": [
				{"location": "Tbilisi", "additional info": "Georgia, Europe"},
				{"location": "United States", "additional info": "North America"}
			]
		}
		res.json(jsonToSend);
	} else if (searchJson["search type"] == "rentals") {
		let jsonToSend = {	
			"recently viewed info": [
				{"location": "Tbilisi", "additional info": "Georgia, Europe"},
				{"location": "United States", "additional info": "North America"}
			]
		}
		res.json(jsonToSend);
	} else if (searchJson["search type"] == "flights") {
		let jsonToSend = {	
			"recently viewed info": [
				{"location": "Tbilisi", "additional info": "Georgia, Europe"},
				{"location": "United States", "additional info": "North America"}
			]
		}
		res.json(jsonToSend);	
	} else if (searchJson["search type"] == "things to do") {
		let jsonToSend = {	
			"recently viewed info": [
				{"location": "Tbilisi", "additional info": "Georgia, Europe"},
				{"location": "United States", "additional info": "North America"}
			]
		}
		res.json(jsonToSend);	
	} else if (searchJson["search type"] == "restaurants") {
		let jsonToSend = {	
			"recently viewed info": [
				{"location": "Tbilisi", "additional info": "Georgia, Europe"},
				{"location": "United States", "additional info": "North America"}
			]
		}
		res.json(jsonToSend);	
	}
});

// temp for rendering restaurant view as home page
const r = require("./js/data/restaurant.json");
app.get("/restaurant.json", function(req,res) {
	res.json(r);
});

const searchNotes = require("./js/data/searchnotes.json");
app.post("/searchnotes.json", function(req,res) {
	let searchJson = req.body;
	if (searchJson["search type"] == "notes") {
		res.json(searchNotes);
	}
});

app.listen(8000, function() {
	// visualize running server 
	console.log("listening on port 8000");
});

