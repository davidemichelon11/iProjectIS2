//Route to all paths of exams
const express = require('express');
const Exam = require('../models/exam');
const bodyParser = require('body-parser');
const examsRoutes = express.Router();

express().use(bodyParser.json())
express().use(bodyParser.urlencoded)


examsRoutes.route('/')
//get all exams
.get(async function (req, res) {
   
})
//add a new exam
.post(async function (req, res) {
    
})

module.exports = examsRoutes;
