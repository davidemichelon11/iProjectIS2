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
    JSON.stringify(response) === "[]" ? res.status(404).json({"STATUS":"NOT FOUND"}) : res.status(200).json(response)
})
//add the specified test, if the criterias doesn't respect the format 403 status will be responded
.post(async function (req, res) {
    var isOk = await Test.addTest(req.body);
    isOk ? res.status(200).json({"status":"OK"}) : res.status(403).json({"status":"NOT OK"})
})
.delete(async function (req, res) {
    var removedTests = await Test.removeTest(req.query);
    JSON.stringify(removedTests) === "[]" ? res.status(404).json({"STATUS":"ID NOT FOUND"}) : res.status(200).json(removedTests);
})

module.exports = testsRoutes
