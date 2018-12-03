//Routes to /V1 of every resource

const express = require('express');
var routesV1 = express.Router();

// public routes

routesV1.get('/', function(req, res) {
	res.json({ message: 'ROUTESV1 WORKS!' });
})


//Route for exams
var examsRoute = require('./examsRoute');
routesV1.use('/exams', examsRoute);

//Route for assignments
var assignmentsRoute = require('./assignmentsRoute');
routesV1.use('/assignments', assignmentsRoute);

var testsRoutes = require('./testsRoute')
routesV1.use('/tests', testsRoutes)

module.exports = routesV1;