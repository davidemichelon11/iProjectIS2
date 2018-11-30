//Route to all paths of test
const express = require('express');
const Test = require('../models/test');
const bodyParser = require('body-parser');
const testsRoutes = express.Router();

express().use(bodyParser.json())
express().use(bodyParser.urlencoded)


testsRoutes.route('/')
//get tests that respect criterias, if no criterias are defined all tests will be returned
.get(async function (req, res) {
    var criterias = req.query;
    var response = await Test.findTestsByCriterias(criterias)
    res.json(response)
})
//TODO
.post(async function (req, res) {
    var isOk = await Test.addTest(req.body);
    isOk ? res.status(200).json({"status":"OK"}) : res.status(404).json({"status":"NOT OK"})
})

module.exports = testsRoutes
