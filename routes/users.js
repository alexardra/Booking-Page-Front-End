const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.post('/register', function(req, res) {
    let username = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    let location = req.body.location;
    let password = req.body.password;

    let newUser = new User({
        username : username, 
        password : password,         
        email : email, 
        location : location,
        age : age
    });

    User.createUser(newUser, function(error, user) {
        if (error) throw error;
        console.log(user);
    })
});

module.exports = router;