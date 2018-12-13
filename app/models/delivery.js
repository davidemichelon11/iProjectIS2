var uniqid = require('uniqid');

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
            deliveriesTable.push(criterias);
            return true
        } 
        return false
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