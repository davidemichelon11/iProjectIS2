const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3000



//set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test APIs
app.get('/', function(req, res) {
	res.send('Hello! The API is at /v1');
});


//routes V1
var routesV1 = require('./app/routes/apisV1');
app.use('/v1', routesV1);

module.exports = app;