
//Route to all paths of exams
const express = require('express');
const Workgroup = require('../models/workgroups');
const bodyParser = require('body-parser');
const workgroupsRoutes = express.Router();

express().use(bodyParser.json())
express().use(bodyParser.urlencoded)


workgroupsRoutes.route('/')
//get all workgroups
.get(async function (req, res) {
    let workgroups = await Workgroup.find(req.query)
    if(workgroups === undefined)
        res.status(400).send("Error, something went wrong")
    
        res.json(workgroups)
})
//add a new workgroup
.post(async function (req, res) {
    var newWorkgroup = new Workgroup()
    //check if all fields are sent, if not send 403 error
    if(Object.keys(req.body).length < 2){
            res.status(403).send('Error 403: Not enough parmenters')
    }else{
        newWorkgroup.name = req.body.name
        newWorkgroup.members = req.body.members

        if(newWorkgroup.name === undefined || newWorkgroup.members === undefined )
            res.status(403).send('Error 403: Not all parameters given')
        else{
            Workgroup.addWorkgroups(newWorkgroup)
            res.status(201).send('Success: workgroup created')
        }
          
    }    
})

.delete(async function (req, res) {
    res.status(400).send('Error: not enough parameters given')
})

.put(async function (req, res) {
    res.status(400).send('Error: not enough parameters given')
})

workgroupsRoutes.route('/:id')
.delete(async function (req, res) {
    let result = await Workgroup.delete(req.params.id)
    if(result == 200){
        res.status(200).send('Success: workgroups deleted')
    }        
    else if(result == 404){
        res.status(404).send('Error 404: element not found')
    }
})

.put(async function (req, res) { 
    var editWorkgroups = new Workgroup()

    editWorkgroups.id = req.params.id   
    editWorkgroups.name = req.body.name
    editWorkgroups.members = req.body.members

    let result = await Workgroup.put(editWorkgroups)
    
    if(result === 200)
        res.status(200).send('Success update')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})
module.exports = workgroupsRoutes;