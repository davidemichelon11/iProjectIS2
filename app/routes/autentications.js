const express = require('express');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Professor   = require('../models/professor');
const Student   = require('../models/student');
const config = require('../../config'); // get our config file

const authenticationsRoutes = express.Router();

authenticationsRoutes.post('/', async function(req, res) {
	// find the user
	var user = await Professor.findByName(req.body.name)
	if(JSON.stringify(user) == '[]')
		user = await Student.findByName(req.body.name)
	
	if (JSON.stringify(user) == '[]') {
		// user not found
		res.json({ success: false, message: 'Authentication failed. User not found.' });
		
	} else {

		// check if password matches
		if (user.password != req.body.password) {
			// wrong password
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });

		} else {

			// if user is found and password is right
			// create a token
			var payload = {
				id: user.id,
				name: user.name,
				email: user.email
			}
			var options = {
				expiresIn: 86400 // expires in 24 hours
			}
			var token = jwt.sign(payload, config.superSecret, options);

			// signed in
			res.json({ success: true, message: 'Enjoy your token!', token: token });
		}

	}

});

module.exports = authenticationsRoutes;