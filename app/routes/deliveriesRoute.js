const express = require('express');
const Delivery = require('../models/delivery');

const deliveriesRoute = express.Router(); 

deliveriesRoute.route('/')

//get all deliveries
.get(async function(req, res) {
    var criterias = req.query;
    var response = await Delivery.findDeliveries(criterias)
    res.status(200).json(response)
})

//delivery your exams
.post(function(req, res){
    Delivery.addDelivery(req.body)
    .then(function(response){
        if(response){
            res.status(200).send({result: 'inserted'})
        }else{
            res.status(405).send({error: 405, result: 'not all params inserted'})
        }
    })

    .catch(function(result){
        if(result === undefined)
            res.status(404).send({result:'Exam or student does not find'})
        else if (result === 'fail')
            res.status(404).json({result:'not all params'})
        else if (result === 'deadline')
            res.status(403).json({result: 'too late'})
        else{
            res.status(404)
        }
    })
})

module.exports = deliveriesRoute;