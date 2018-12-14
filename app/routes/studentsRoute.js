const express = require('express');
const Student   = require('../models/student');

const studentsRoutes = express.Router(); 

studentsRoutes.route('/')

//get all the student
.get(async function(req, res) {
    var students = new Student();
    students = await Student.find(req.query)
    if(students == undefined)
        res.status(400).send('Error, something went wrong')

    res.status(200).json(students)
})

//create a student
.post(async function(req, res){
    var student = new Student()
    student.id= req.body.id
    student.name = req.body.name
    student.email = req.body.email
    student.password = req.body.password
    if(student.name === undefined || student.email === undefined || student.password === undefined){
        res.status(403).send('Error 403: Not all parameters given')
    }else{
        Student.addStudent(student)
        res.status(201).send('Success: student inserted')
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

studentsRoutes.route('/:id')
//delete a student
.delete(async function(req, res){
    let result = await Student.delete(req.params.id)
    if(result == 200){
        res.status(200).send('Success: student deleted')
    }        
    else if(result == 404){
        res.status(404).send('Error 404: element not found')
    }
})

//update a student
.put(async function (req, res) { 
    var editStudent = new Student()

    editStudent.id = req.params.id   
    editStudent.name = req.body.name
    editStudent.email = req.body.email
    editStudent.password = req.body.password

    let result = await Student.put(editStudent)
    
    if(result === 200)
        res.status(200).send('Success update')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})

module.exports = studentsRoutes;
