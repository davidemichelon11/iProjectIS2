var uniqid = require('uniqid');
var Student = require('../models/student');
var Exam = require('../models/exam');
const fetch = require('node-fetch');


var deliveriesTable = global.deliveriesTable;
if(deliveriesTable == undefined)
    deliveriesTable = [];

class Delivery{
    //return all exams
    static async getAll(){        
        //return deliveriesTable;
        res.send('Work');
    }
    //add a new exam
    static addDelivery(criterias){
        if(criterias.id === undefined){
            criterias.id = uniqid();
        }
        if(Object.keys(criterias).length == 4) {
            return  new Promise( (resolve, reject) => {
                Delivery.checkStudent(criterias.idStudent).then(function(res) {
                    if(res){
                        deliveriesTable.push(criterias);
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                });
            });
        }
    }
            
    static checkStudent(id){
        var response;
        var res={}; res.id = id;
        return  new Promise( async(resolve, reject) => {
            response = await Student.find(res);
            if(response.length == 0){
                resolve(false)
            }else{
                resolve(true)
            }
        });
    }

    static async findDeliveries(criterias) {

        let matchingDeliveries = deliveriesTable.filter(t => {
            return (criterias.idStudent == undefined ? true : t.idStudent === criterias.idStudent)
                && (criterias.idExam == undefined ? true : t.idExam === criterias.idExam)
        })
        return matchingDeliveries
    }

}

module.exports = Delivery;