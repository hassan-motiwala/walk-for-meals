const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');
let newUser = mongoose.model('User');
const Restaurant = mongoose.model('Restaurant');
let newRestaurant = mongoose.model('Restaurant');


function register(user, errorCallback, successCallback, fullName, userName, email, password, contact) {

	let collection;
	let newCollection;

	if(user === 'user') {
		collection = User;
	}
	else if(user === 'restaurant') {
		collection = Restaurant;
	}

	let errObj = {message: ""};

	//Check for the length of userName and password.
	if(userName.length<8 || password.length<8) {
		errObj.message = "userName PASSWORD TOO SHORT";
		errorCallback(errObj);	
	}
	//Check if the userName alrwady exists.
	else {
		collection.find({userName: userName}, function(err, result, count) {  
	 	
		 	if(result.length > 0) {
				errObj.message = "userName ALREADY EXISTS";
				errorCallback(errObj);
			}

			else if(result.length === 0) {
				//Create a hash and save it in the database.
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);

				if(errObj.message.length === 0) {
					if(user === 'user') {
						new newUser({
							fullName: fullName,
							userName: userName, 
							email: email, 
							password: hash,
							commits: 0,
							totalCommits: 0
						}).save(function(err, doc) {
							if(err) {
							errObj.message = err;
							errorCallback(errObj);		
							}

							else if(errObj.message.length === 0) {
								User.find({userName: userName, email: email}, function(err, updatedUser, count) {
									successCallback(updatedUser);
								});
							}
						});
					}

					else if(user === 'restaurant') {
						new newRestaurant({
							restaurantName: fullName,
							userName: userName, 
							email: email, 
							password: hash,
							contact: contact,
							totalDeliveries: 0
						}).save(function(err, doc) {
							if(err) {
							errObj.message = "DOCUMENT SAVE ERROR";
							errorCallback(errObj);		
							}

							else if(errObj.message.length === 0) {
								Restaurant.find({userName: userName, email: email}, function(err, updatedUser, count) {
									successCallback(updatedUser);
								});
							}
						});
					}
				}
			}
		});
	}
}


function login(user, userName, password, errorCallback, successCallback) {
	let errObj = {message: ''};

	let collection;

	if(user === 'user') {
		collection = User;
	} else if (user === 'restaurant') {
		collection = Restaurant;
	}	

	collection.find({userName: userName}, function(err, result, count) {
	
		if(result.length === 0) {
	 		errObj.message = "USER NOT FOUND";
	 		errorCallback(errObj);
	 	}

		else if(result.length > 0) {
			bcrypt.compare(password, result[0].password, function(err, res) {
			 	if(res) {
			 		successCallback(result);
			 	}
			 	else {
					errObj.message = "INCORRECT PASSWORD";
					errorCallback(errObj);			 		
			 	}
			});
	 	}
	});
}

function startAuthenticatedSession(req, user, cb) {
	req.session.regenerate(function(err) {
		if(err) {
			console.log(err);
		}
		else {
			req.session.userId = user[0]._id;
		  	req.session.userName = user[0].userName;
		  	cb();
		}
	});
}

module.exports = {
  startAuthenticatedSession: startAuthenticatedSession,
  register: register,
  login: login
};
