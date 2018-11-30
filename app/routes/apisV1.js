//Routes to /V1 of every resource

const express = require('express');
var routesV1 = express.Router();

// public routes

routesV1.get('/', function(req, res) {
	res.json({ message: 'ROUTESV1 WORKS!' });
});

var examsRoutes = require('./examsRoute');
routesV1.use('/exams', examsRoutes);

module.exports = routesV1;