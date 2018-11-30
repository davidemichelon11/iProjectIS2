const express = require('express');
const Student   = require('../models/student');

const studentsRoutes = express.Router(); 

studentsRoutes.route('/')
.get(async function(req, res) {
	//let users = await User.find({});
    //res.json(users);
    let students = await Student.getAll()
    res.json(students)
})
.post(async function(req, res){
    var student = new Student()
    student.name = req.body.name
    student.email = req.body.email
    student.password = req.body.password
    if(student.name === undefined || student.email === undefined || student.password === undefined){
        res.status(403).send('Error 403: Not all parameters given')
    }else{
        Student.addStudent(student)
        res.status(201).send('Success: student inserted')
    }
    
    res.send('Student inserted')
})

module.exports = studentsRoutes;
