const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3000

//set cors
app.use(cors());
app.use(function (req, res, next) { //consente cross domain
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//test APIs
app.get('/', express.static('public'));
app.use('/exams', express.static('app/frontend/'));


//routes V1
var routesV1 = require('./app/routes/apisV1');
app.use('/v1', routesV1);

module.exports = app;