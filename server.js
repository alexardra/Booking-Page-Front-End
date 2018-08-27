const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travelerapp', { useNewUrlParser: true });
const db = mongoose.connection;

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

/* Middleware setup */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

/* Static resources - styles, images, etc. */
app.use(express.static(path.join(__dirname, 'public')));

/* Express session */
app.use(session({
	secret: 'secret',
	saveUninitialized: true, 
	resave: true
}));

/* Passport init */
app.use(passport.initialize());
app.use(passport.session());

/* Express Validator */
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;
  
	  while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	  }
	  return {
		param : formParam,
		msg   : msg,
		value : value
	  };
	}
  }));

/* Connect Flash */
app.use(flash());

/* Global variables for flash */
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

/* ROUTES */
app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function() {
	// visualize running server 
	console.log("listening on port 8000");
});

