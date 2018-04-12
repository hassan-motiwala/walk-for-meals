const mongoose = require('mongoose');

//Schema goes here.
const User = new mongoose.Schema({
	fullName: String,
	userName: {type: String, unique: true, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	commits: Number,
    totalCommits: Number
});

const Restaurent = new mongoose.Schema({
	restaurentName: String,
	userName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	location: String,
	totalDeliveries: String
});

const Location = new mongoose.Schema({ 
	userId: String,
	location: String,
	comments: String,
	restaurentId: String
});

const Discount = new mongoose.Schema({
	userId: String,
	discountStatus: String,
	discountPercent: String
});



mongoose.model('User', User);
mongoose.model('Restaurent', Restaurent);
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

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	const conf = JSON.parse(data);
	dbconf = conf.dbconf;
} else {
	// if we're not in PRODUCTION mode, then use
	dbconf = 'mongodb://localhost/finalProject';
}

mongoose.connect(dbconf);
