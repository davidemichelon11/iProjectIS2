var uniqid = require('uniqid');

var examsTable = global.examsTable;
if(examsTable == undefined)
    examsTable = [];

class Exam{
    //return all exams
    static async getAll(){        
        return examsTable;
    }
    //add a new exam
    static async addExam(criterias){  
        criterias.id = uniqid();
        examsTable.push(criterias);
    }
}

module.exports = Exam;