const express = require('express');
const Assignment = require('../models/assignment');

const assignmentsRoute = express.Router(); 

assignmentsRoute.route('/')

//get all the assignment
.get(async function(req, res) {
    var assignments = new Assignment()
    assignments = await Assignment.find(req.query)
    if(assignments == undefined)
        res.status(400).send('Error, something went wrong')

    res.status(200).json(assignments)
})

//create an assignment
.post(async function(req, res){
    var assignment = new Assignment()
    assignment.name = req.body.name
    assignment.idTest = req.body.idTest
    assignment.idCourse = req.body.idCourse
    assignment.idProfessor = req.body.idProfessor
    assignment.deadline = req.body.deadline
    assignment.obligatory = req.body.obligatory
    if(assignment.name === undefined || assignment.idTest === undefined 
        || assignment.idProfessor === undefined || assignment.idCourse === undefined
        || assignment.deadline === undefined || assignment.obligatory === undefined){               
        res.status(403).send('Error 403: Not all parameters given')
    }else{
        Assignment.addAssignment(assignment)
        res.status(201).send('Success: assignment inserted')
    }
})

//it is to prevent a bug
.delete(async function(req, res){
    res.status(400).send("Error 400: no parameters given")
})
//it is to prevent a bug
.put(async function(req, res){
    res.status(400).send("Error 400: no parameters given")
})

assignmentsRoute.route('/:id')
//delete an assignment
.delete(async function(req, res){
    let result = await Assignment.delete(req.params.id)
    if(result == 200){
        res.status(200).send('Success: assignment deleted')
    }        
    else if(result == 404){
        res.status(404).send('Error 404: element not found')
    }
})

//update an assignment
.put(async function (req, res) { 
    var editAssignment = new Assignment()

    editAssignment.id = req.params.id   
    editAssignment.name = req.body.name
    editAssignment.idTest = req.body.idTest
    editAssignment.idCourse = req.body.idCourse
    editAssignment.idProfessor = req.body.idProfessor
    editAssignment.deadline = req.body.deadline
    editAssignment.obligatory = req.body.obligatory

    let result = await Assignment.put(editAssignment)
    
    if(result === 200)
        res.status(200).send('Success update')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})

module.exports = assignmentsRoute;