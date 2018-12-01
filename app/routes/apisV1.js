//Routes to /V1 of every resource

const express = require('express');
var routesV1 = express.Router();

// public routes

routesV1.get('/', function(req, res) {
	res.json({ message: 'ROUTESV1 WORKS!' });
})


var testRoutes = require('./testRoute')
routesV1.use('/tests', testRoutes)

module.exports = routesV1;