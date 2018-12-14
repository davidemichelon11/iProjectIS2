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

    static async put(criterias){
        
        let examIndex = examsTable.findIndex(e => e.id === criterias.id)
        if(examIndex == -1)
            return 404

        if(criterias.name != undefined) examsTable[examIndex].name = criterias.name
        if(criterias.profName != undefined) examsTable[examIndex].profName = criterias.profName
        if(criterias.courseName != undefined) examsTable[examIndex].courseName = criterias.courseName
        if(criterias.deadline != undefined) examsTable[examIndex].deadline = criterias.deadline
        if(criterias.examType != undefined) examsTable[examIndex].examType = criterias.examType
        
        return 200
    }
}

module.exports = Exam;