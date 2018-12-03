
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
    let workgroups = await Workgroup.getAllWorkgroups()
    res.json(workgroups)
})
//add a new workgroup
.post(async function (req, res) {
    var newWorkgroup = new Workgroup()
    //check if all fields are sent, if not send 403 error
    if(Object.keys(req.body).length < 3){
            res.status(403).send('Error 403: Not enough parmenters')
    }else{
        newWorkgroup.nameWorkgroup = req.body.nameWorkgroup
        newWorkgroup.member = req.body.member

        if(newWorkgroup.nameWorkgroup === undefined || newWorkgroup.member === undefined )
            res.status(403).send('Error 403: Not all parameters given')
        else{
            Workgroup.addWorkgroups(newWorkgroup)
            res.status(201).send('Success: workgroup created')
        }
          
    }    
})

module.exports = workgroupsRoutes;