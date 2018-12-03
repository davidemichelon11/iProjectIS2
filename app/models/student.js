var uniqid = require('uniqid');

var studentsTable = global.studentsTable
if ( studentsTable == null )
    studentsTable = [];

class Student{

    static async getAll(){        
        return studentsTable;
    }
    static async addStudent(criterias){  
        criterias.id = uniqid();
        studentsTable.push(criterias);
    }
    static async delete(criterias){
        
    }
    
}

module.exports = Student;
