require('./db');

const auth = require('./auth.js');
const mongoose = require('mongoose');

const Restaurent = mongoose.model('Restaurent');
const User = mongoose.model('User');
const Location = mongoose.model('Location');
const Discount = mongoose.model('Discount');

let newRestaurent = mongoose.model('Restaurent');
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


app.listen(process.env.PORT || 3000);