const express = require('express');
const router = express.Router();

/* Request main page */
router.get("/", function(req, res) {
	res.sendFile('index.html', {root: './public/html'});
});

router.get("/templates.html", function(req, res) {
	res.sendFile('/templates.html', {root : './public/html'});
});

const data = require("./../public/js/data/data.json");
router.get("/data.json", function(req,res) {
	res.json(data);
});

module.exports = router;
