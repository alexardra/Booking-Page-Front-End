const express = require('express');
const router = express.Router();

/* Request main page */
router.get("/", function(req,res) {
	res.sendFile('index.html', {root: './public/html'});
});

module.exports = router;
