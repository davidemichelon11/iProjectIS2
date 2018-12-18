//Routes to /V1 of every resource
const express = require('express');
var routesV1 = express.Router();

// public routes

routesV1.get('/', function(req, res) {
	res.json({ message: 'ROUTESV1 WORKS!' });
})

var autenticationsRoute = require('./autentications')
routesV1.use('/autentication', autenticationsRoute)

var deliveriesRoute = require('./deliveriesRoute');
routesV1.use('/deliveries', deliveriesRoute);

var assignmentsRoute = require('./assignmentsRoute');
routesV1.use('/assignments', assignmentsRoute);

var testsRoutes = require('./testsRoute')
routesV1.use('/tests', testsRoutes)

var workgroupsRoute = require('./workgroupsRoute');
routesV1.use('/workgroups', workgroupsRoute);


var studentsRoutes = require('./studentsRoute');
routesV1.use('/students', studentsRoutes);

var professorsRoutes = require('./professorsRoute');
routesV1.use('/professors', professorsRoutes);

// ---------------------------------------------------------
// route middleware to check authentication token
// ---------------------------------------------------------
var tokenChecker = require('../middlewares/tokenChecker');
routesV1.use(tokenChecker);

var examsRoutes = require('./examsRoute');
routesV1.use('/exams', examsRoutes);

module.exports = routesV1;