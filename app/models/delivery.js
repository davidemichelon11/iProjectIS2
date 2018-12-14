var uniqid = require('uniqid');
var Student = require('../models/student');
var Exam = require('../models/exam');


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
                var responseExam;
                Delivery.checkStudent(criterias.idStudent).then(async function() {
                        //check if exam exist and deadline is after now
                        responseExam = await new Promise((resolve, reject)=>{
                            Delivery.checkExam(criterias.idExam).then(function(res){
                                if(res){
                                    deliveriesTable.push(criterias);
                                    resolve(true)
                                }
                            }).catch(function(result){
                                reject(result)
                            })
                        })
                        if(responseExam){
                            resolve(true)
                        }
                }).catch(async function(res){
                    reject(res)
                });
                
            });
        }else{
            return new Promise( (resolve, reject) => {
                reject('fail')
            })
        }
    }
    //check if exam exist and deadline
    static checkExam(id){
        var response;
        var res={}; res.id = id;
        return  new Promise( async(resolve, reject) => {
            response = await Exam.findExams(res);
            if(response.length == 0){
                reject()
            }else{
                //seek only for id --> 1 result
                if(Date.now()>response[0].deadline){
                    resolve(true)
                }
                reject('deadline')
            }
        });
    }
    //check if student exist
    static checkStudent(id){
        var response;
        var res={}; res.id = id;
        return  new Promise( async(resolve, reject) => {
            response = await Student.find(res);
            if(response.length == 0){
                reject()
            }else{
                resolve()
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