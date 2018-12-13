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
    var isOk = Delivery.addDelivery(req.body);
    if(isOk){
        res.status(200).send({result: 'inserted'})
    }else{
        res.status(405).send({error: 405, result: 'not all params inserted'})
    }
})

module.exports = deliveriesRoute;