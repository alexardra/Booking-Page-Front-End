let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let app = express();

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

const about = require("./js/data/about.json");
app.get("/about.json", function(req,res) {
	res.json(about);
});

const users = require("./js/data/users.json");
app.post("/users.json", function(req,res) {
	res.json(users);
});

app.get("/users.json", function(req,res) {
	res.json(users);
});

const restaurant = require("./js/data/restaurant.json");
const hotel = require("./js/data/hotel.json");
const todo = require("./js/data/todo.json");
app.post("/searchjson.json", function(req, res) {
	let searchJson = req.body; // json object
	if (searchJson["search type"] == "restaurants") {
		res.json(restaurant);
	} else
	if (searchJson["search type"] == "hotel") {
		let combinedJson = Object.assign(hotel, destinations);
		fs.writeFile("./js/data/hotel.json", JSON.stringify(combinedJson), 'utf8',function() {});
		res.json(hotel);
	} else
	if (searchJson["search type"] == "flight") {
		let flight = {"name" : "Istanbul"};
		let combinedJson = Object.assign(flight, destinations);
		// fs.writeFile("./js/data/flight.json", JSON.stringify(combinedJson), 'utf8',function() {});
		res.json(combinedJson);
	} else
	if (searchJson["search type"] == "rental") {
		let rental = {"name":"Palermo Apartments"};
		let combinedJson = Object.assign(rental, destinations);
		res.json(combinedJson);
	} else 
	if (searchJson["search type"] == "things to do") {
		res.json(todo);
	}
});

app.post("/searchinput.json", function(req,res) {
	let searchJson = req.body;

	let jsonToSend = {	
		"recently viewed info": [
			{"location": "Tbilisi", "additional info": "Georgia, Europe"},
			{"location": "United States", "additional info": "North America"}
		]
	}
	if (searchJson["search type"] == "hotels") {
		res.json(jsonToSend);
	} else if (searchJson["search type"] == "rentals") {
		res.json(jsonToSend);
	} else if (searchJson["search type"] == "flights") {
		res.json(jsonToSend);	
	} else if (searchJson["search type"] == "things to do") {
		res.json(jsonToSend);	
	} else if (searchJson["search type"] == "restaurants") {
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

app.post("/bookmark.json", function(req,res) {
	let bookmark = req.body;
	let entry = bookmark["section"][0];

	let type = entry["url"].substring(1,entry["url"].indexOf("="));
	let index = ["hotel", "rental", "flight", "restaurant", "things-to-do"].indexOf(type);
	let insertInto = searchNotes["section contents"][index]["section"];
	insertInto.push(entry);

	fs.writeFile("./js/data/searchnotes.json", JSON.stringify(searchNotes), 'utf8',function() {});
});

app.post("/contact.json", function(req,res) {
	let contactJson = req.body;
	fs.writeFile("./js/data/contact.json", JSON.stringify(contactJson), 'utf8',function() {
		res.json({"status" : "success"});
	});
});

app.post("/addquestion.json", function(req,res) {
	let questionJson = req.body;
	restaurant["q&n"].push(questionJson);
	fs.writeFile("./js/data/restaurant.json", JSON.stringify(restaurant), 'utf8',function() {});
	res.json(restaurant);
});

app.post("/signup.json", function(req,res) {
	let userInfo = req.body;
	let users = require("./js/data/usersinfo.json");
	let numUsers = users["users"].length;
	let id =  numUsers + 1;
	userInfo["id"] = id;
	users["users"].push(userInfo);
	fs.writeFile("./js/data/usersinfo.json", JSON.stringify(users), 'utf8',function() {
		res.json({"status" : "success", "id" : id});
	});

});

function findIndex(users, userId) {
	let numUsers = users["users"].length;
	let index = 0; 
	for (let i = 0; i < numUsers; i++) {
		let currentUser = users["users"][i];
		if (currentUser["id"] == userId) {
			index = i;
			break;
		}
	}
	return index;
}

app.post("/userinfo.json", function(req,res) {
	let users = require("./js/data/usersinfo.json");
	let userId = req.body["id"];
	let index = findIndex(users, userId);
	res.json(users["users"][index]);
});

app.post("/aboutuser.json", function(req,res) {
	let users = require("./js/data/usersinfo.json");
	let userId = req.body["id"];
	let index = findIndex(users, userId);

	users["users"][index]["about"] = req.body["text"];
	fs.writeFile("./js/data/usersinfo.json", JSON.stringify(users), 'utf8',function() {
		res.json({"status" : "success"});
	});
});


app.listen(8000, function() {
	// visualize running server 
	console.log("listening on port 8000");
});

