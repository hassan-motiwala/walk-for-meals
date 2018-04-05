const mongoose = require('mongoose');

//Schema goes here.
const User = new mongoose.Schema({
	fullName: String,
	userName: {type: String, unique: true, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	commits: number,
    totalCommits: number
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
	restaurentId: String,
});

const Discount = new mongoose.Schema({
	userId: String,
	discountStatus: String,
	discountPercent: String;
});



mongoose.model('User', User);
mongoose.model('Restaurent', Restaurent);
mongoose.model('Location', Location);
mongoose.model('Discount', Discount);

mongoose.connect('mongodb://localhost/finalProject');
