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

    //delete an exam
    static async delete(criterias){ 
        let examIndex = examsTable.findIndex(e => e.id === criterias)
        if(examIndex == -1)
            return 404
        
        examsTable.splice(criterias, 1)
        return 204
         
    }
}

module.exports = Exam;