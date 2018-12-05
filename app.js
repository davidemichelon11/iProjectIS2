const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3000



//set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test APIs
app.get('/', express.static('public/'));


//routes V1
var routesV1 = require('./app/routes/apisV1');
app.use('/v1', routesV1);

module.exports = app;