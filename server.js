var express = require("express");
var app = express();

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

app.listen(8000, function() {
	// visualize running server 
	console.log("listening on port 8000");
});

