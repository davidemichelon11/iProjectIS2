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
    res.status(200).json(exams)
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

.delete(async function (req, res) {  
    res.status(400).send('Error 400: syntax error') //serve perche se non passo parametri mi dia un errore di sintassi
})//metodo da valutare perchè ora ho due delete per la stessa risorsa di cui solo una documentata su apiary

examsRoutes.route('/:id') //route like http://localhost/v1/exams/...

//delete an exam
.delete(async function (req, res) {   
    let result = await Exam.delete(req.params.id)

    if(result === 204)
        res.status(204).send('Success')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})

//update an exam
.put(async function (req, res) { 
    var editExam = new Exam()

    editExam.id = req.params.id   
    editExam.name = req.body.name
    editExam.profName = req.body.profName
    editExam.courseName = req.body.courseName
    editExam.deadline = req.body.deadline
    editExam.examType = req.body.examType

    let result = await Exam.put(editExam)
    
    if(result === 200)
        res.status(200).send('Success update')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})

module.exports = examsRoutes;
