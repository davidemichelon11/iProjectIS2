const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config'); // get our config file

const tokenChecker = function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(req.method == 'POST')
		next()
	// decode token
	else if (token) {

		// verifies secret and checks exp
		jwt.verify(token, config.superSecret, function(err, decoded) {			
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				})
			} else {
				// if everything is good, save to request for use in other routes
				req.user = decoded
				next()
			}
		})

	} else {
		// if there is no token
		// return an error
		return res.status(401).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
}

module.exports = tokenChecker