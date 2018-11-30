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
    let exams = await Exam.getAll()
    res.json(exams)
})
//add a new exam
.post(async function (req, res) {
    var newExam = new Exam()
    //check if all fields are sent, if not send 403 error
    if(Object.keys(req.body).length < 5){
            res.status(403).send('Error 403: Not enough parmenters')
    }else{
        newExam.name = req.body.name
        newExam.profName = req.body.profName
        newExam.courseName = req.body.courseName
        newExam.deadline = req.body.deadline
        newExam.examType = req.body.examType

        if(newExam.name === undefined || newExam.profName === undefined || newExam.courseName === undefined || newExam.deadline === undefined || newExam.examType === undefined)
            res.status(403).send('Error 403: Not all parameters given')
        else{
            Exam.addExam(newExam)
            res.status(201).send('Success: exam created')
        }
          
    }    
})

module.exports = examsRoutes;
