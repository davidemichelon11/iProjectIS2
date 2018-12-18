var uniqid = require('uniqid');

var studentsTable = global.studentsTable
if ( studentsTable == null )
    studentsTable = [];

class Student{
    //get all student
    static async getAll(){        
        return studentsTable;
    }

    //get all student
    static async find(criterias){  
        var students = studentsTable.filter(u => {
            return (criterias.name == undefined ? true : u.name === criterias.name)
            &&     (criterias.email == undefined ? true : u.email === criterias.email)
			&&     (criterias.id == undefined ? true : u.id === criterias.id)
        });
        return students
    }

    //find student by name
    static async findByName(criterias){        
        var students = studentsTable.filter(u => {
            return u.name === name
        });
        return students
    }

    //adding a student
    static async addStudent(criterias){
        if(criterias.id===undefined){
            criterias.id = uniqid();
        }  
        studentsTable.push(criterias);
    }

    //delete a student
    static async delete(criterias){ 
        let studentIndex = studentsTable.findIndex(e => e.id === criterias)
        if(studentIndex == -1)
            return 404
        
        studentsTable.splice(criterias, 1)
        return 200
         
    }

    //update a student
    static async put(criterias){
        let studentIndex = studentsTable.findIndex(e => e.id === criterias.id)
        if(studentIndex == -1)
            return 404

        if(criterias.name != undefined) studentsTable[studentIndex].name = criterias.name
        if(criterias.email != undefined) studentsTable[studentIndex].email = criterias.email
        if(criterias.password != undefined) studentsTable[studentIndex].password = criterias.password
        
        return 200
    }
}
module.exports = Student;