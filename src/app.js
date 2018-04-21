require('./db');

const auth = require('./auth.js');
const mongoose = require('mongoose');

const Restaurant = mongoose.model('Restaurant');
const User = mongoose.model('User');
const Location = mongoose.model('Location');
const Discount = mongoose.model('Discount');

let newRestaurant = mongoose.model('Restaurant');
let newUser = mongoose.model('User');
let newDiscount = mongoose.model('Discount');
let newLocation = mongoose.model('Location');

const express = require('express');
const session = require('express-session');

const app = express();

const sessionOptions = { 
	secret: 'secret for signing session id',
	saveUninitialized: true, 
	resave: false 
};

app.use(session(sessionOptions));

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'hbs');

const path = require('path');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


//GET / ROUTE
app.get('/', (req, res) => {
	res.render('index');
});

/********************************************************************/

//GET USER/SIGNIN ROUTE
app.get('/user/signIn', (req, res) => {
	res.render('userSignIn-Register');
});

/********************************************************************/

//POST USER/SIGNIN
app.post('/user/signIn', (req, res) => {
	let error = function(errObj) {
		console.log(errObj.message);
		res.render('userSignIn-Register', {error: errObj.message});
	}

	let success = function(newUser) {
		auth.startAuthenticatedSession(req, newUser, cb);
	};

	let cb = function() {
		res.redirect('/');
	};

	auth.login('user', req.body.userName, req.body.password, error, success);
});


//POST USER REGISTER
app.post('/user/register', (req, res) => {
	let cb = function() {
		res.redirect('/');
	};

	let success = function(newUser) {
		auth.startAuthenticatedSession(req, newUser, cb);
	};

	let error = function(errObj) {
		console.log(errObj.message);
		res.render('userSignIn-Register', {error: errObj.message});
	}

	auth.register('user', error, success, req.body.restaurantName, req.body.userName, req.body.email, req.body.password);
});

/*******************************************************************/

//GET RESTAURENT/SIGNIN
app.get('/restaurant/signIn', (req, res) => {
	res.render('restaurantSignIn-Register');
});

/********************************************************************/

//POST RESTAURANT/LOGIN
app.post('/restaurant/signIn', (req, res) => {
	let error = function(errObj) {
		console.log(errObj.message);
		res.render('restaurantSignIn-Register', {error: errObj.message});
	}

	let success = function(newUser) {
		auth.startAuthenticatedSession(req, newUser, cb);
	};

	let cb = function() {
		res.redirect('/');
	};

	auth.login('restaurant', req.body.userName, req.body.password, error, success);
});

//POST RESTAURANT/REGISTER
app.post('/restaurant/register', (req, res) => {
	let cb = function() {
		res.redirect('/');
	};

	let success = function(newUser) {
		auth.startAuthenticatedSession(req, newUser, cb);
	};

	let error = function(errObj) {
		console.log(errObj.message);
		res.render('userSignIn-Register', {error: errObj.message});
	}

	auth.register('restaurant', error, success, req.body.fullName, req.body.userName, req.body.email, req.body.password, req.body.contact);
});


/*************************************************************/

//GET USERS/LOCATION
app.get('/users/location', (req, res) => {
	let errObj = {message: ''};

	if(req.session.userName) {
		Location.find({}, function(err, results, count) {	
			res.render('users-locations', {locations: results});
		});
	}
	else {
		res.render('userSignIn-Register', {error: "Please sign in/up first"});
	}
});

app.post('/users/location', (req, res) => {

	let errObj = {message: ''};

	new newLocation({
		userName: req.session.userName,
		location: req.body.location,
		comments: req.body.comments,
		restaurantId: ''
	}).save(function(err, doc) {
		if(err) {
			errObj.message = "DOCUMENT SAVE ERROR";
			res.render('users-locations', {message: errObj.message});		
		}

		else if(errObj.message.length === 0) {
			res.redirect('../users/location');
		}
	});
});


/********************************************************************/

app.get('restaurants/pickLocation', (req, res) => {
	
	let errObj = {message: ''};

	if(req.session.userName) {
		Location.find({}, function(err, results, count) {	
			res.render('locations-pickup', {locations: results});
		});
	}
	else {
		res.render('userSignIn-Register', {error: "Please sign in/up first"});
	}
});

app.post('/restaurants/pickLocation', (req, res) => {

	let errObj = {message: ''};

	const location = req.body.location;

	new newLocation({
		userName: req.session.userName,
		location: req.body.location,
		comments: req.body.comments,
		restaurantId: ''
	}).save(function(err, doc) {
		if(err) {
			errObj.message = "DOCUMENT SAVE ERROR";
			res.render('locations-pickup', {message: errObj.message});		
		}

		else if(errObj.message.length === 0) {
			res.redirect('../users/location');
		}
	});
});

/********************************************************************/


app.listen(process.env.PORT || 3000);