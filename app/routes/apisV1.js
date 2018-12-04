//Routes to /V1 of every resource

const express = require('express');
var routesV1 = express.Router();

// public routes

routesV1.get('/', function(req, res) {
	res.json({ message: 'ROUTESV1 WORKS!' });
});

var examsRoutes = require('./examsRoute');
routesV1.use('/exams', examsRoutes);

var assignmentsRoute = require('./assignmentsRoute');
routesV1.use('/assignments', assignmentsRoute);

var workgroupsRoute = require('./workgroupsRoute');
routesV1.use('/workgroups', workgroupsRoute);

module.exports = routesV1;
