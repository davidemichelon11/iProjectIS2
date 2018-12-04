const express = require('express');
const Professor   = require('../models/professor');

const professorsRoutes = express.Router(); 

professorsRoutes.route('/')

//get all the professor
.get(async function(req, res) {
    var professors = new Professor();
    professors = await Professor.find(req.query)
    if(professors == undefined)
        res.status(400).send('Error, something went wrong')

    res.status(200).json(professors)
})

//create a professor
.post(async function(req, res){
    var professor = new Professor()
    professor.name = req.body.name
    professor.email = req.body.email
    professor.password = req.body.password
    if(professor.name === undefined || professor.email === undefined || professor.password === undefined){
        res.status(403).send('Error 403: Not all parameters given')
    }else{
        Professor.addProfessor(professor)
        res.status(201).send('Success: professor inserted')
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

professorsRoutes.route('/:id')
//delete a professor
.delete(async function(req, res){
    let result = await Professor.delete(req.params.id)
    if(result == 200){
        res.status(200).send('Success: professor deleted')
    }        
    else if(result == 404){
        res.status(404).send('Error 404: element not found')
    }
})

//update a professor
.put(async function (req, res) { 
    var editProfessor = new Professor()

    editProfessor.id = req.params.id   
    editProfessor.name = req.body.name
    editProfessor.email = req.body.email
    editProfessor.password = req.body.password

    let result = await Professor.put(editProfessor)
    
    if(result === 200)
        res.status(200).send('Success update')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})

module.exports = professorsRoutes;