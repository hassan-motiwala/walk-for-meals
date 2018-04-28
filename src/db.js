const mongoose = require('mongoose');

//Schema goes here.
const User = new mongoose.Schema({
	fullName: String,
	userName: {type: String, unique: true, required: true},
	email: String,
	password: {type: String, required: true},
	commits: Number,
    totalCommits: Number
});

const Restaurant = new mongoose.Schema({
	restaurantName: String,
	userName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	contact: String,
	address: String,
	totalDeliveries: Number
});

const Location = new mongoose.Schema({
	userName: String,
	location: String,
	comments: String,
	restaurantName: String
});

const Discount = new mongoose.Schema({
	userId: String,
	discountStatus: String,
	discountPercent: String
});


mongoose.model('User', User);
mongoose.model('Restaurant', Restaurant);
mongoose.model('Location', Location);
mongoose.model('Discount', Discount);


// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	const fs = require('fs');
	const path = require('path');
	const fn = path.join(__dirname, '../config.json');
	const data = fs.readFileSync(fn);

	const conf = JSON.parse(data);
	dbconf = conf.dbconf;
} else {
	// if we're not in PRODUCTION mode, then use
	dbconf = 'mongodb://localhost/finalProject';
}

mongoose.connect(dbconf);
