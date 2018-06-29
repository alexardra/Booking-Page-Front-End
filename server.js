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
app.post("/searchjson.json", function(req, res) {
	var searchJson = req.body; // json object
	if (searchJson["search type"] == "restaurants") {
		res.json(restaurant);
	}
	if (searchJson["search type"] == "hotel") {
		res.json(hotel);
	}
	if (searchJson["search type"] == "flight") {
		res.json(flight);
	}

});

// temp for rendering restaurant view as home page
const r = require("./js/data/restaurant.json");
app.get("/restaurant.json", function(req,res) {
	res.json(r);
});


app.listen(8000, function() {
	// visualize running server 
	console.log("listening on port 8000");
});

