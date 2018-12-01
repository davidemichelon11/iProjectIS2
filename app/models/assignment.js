var uniqid = require('uniqid');

var assignmentTable = global.assignmentTable
if (assignmentTable == null )
    assignmentTable = [];

class Assignment{
    //get all assignment
    static async getAll(){        
        return assignmentTable;
    }

    //get all assignment
    static async find(criterias){        
        var assignments = assignmentTable.filter(u => {
            return criterias.name == undefined ? true : u.name === criterias.name
            &&     criterias.idTest == undefined ? true : u.idTest === criterias.idTest
            &&     criterias.id == undefined ? true : u.id === criterias.id
            &&     criterias.idProfessor == undefined ? true : u.idProfessor === criterias.idProfessor
            &&     criterias.nameProfessor == undefined ? true : u.nameProfessor === criterias.nameProfessor
            &&     criterias.idCourse == undefined ? true : u.idCourse === criterias.idCourse
            &&     criterias.nameCourse == undefined ? true : u.nameCourse === criterias.nameCourse
            &&     criterias.deadline == undefined ? true : u.deadline === criterias.deadline
        });
        return assignments
    }

    //adding an assignment
    static async addAssignment(criterias){  
        criterias.id = uniqid();
        assignmentTable.push(criterias);
    }

    //delete an assignment
    static async delete(criterias){ 
        let assignmentIndex = assignmentTable.findIndex(e => e.id === criterias)
        if(assignmentIndex == -1)
            return 404
        
        assignmentTable.splice(criterias, 1)
        return 200
         
    }

    //update an assignment
    static async put(criterias){
        let assignmentIndex = assignmentTable.findIndex(e => e.id === criterias.id)
        if(assignmentIndex == -1)
            return 404
        if(criterias.name != undefined) assignmentTable[assignmentIndex].name = criterias.name
        if(criterias.idTest != undefined) assignmentTable[assignmentIndex].idTest = criterias.idTest
        if(criterias.nameProfessor != undefined) assignmentTable[assignmentIndex].nameProfessor = criterias.nameProfessor
        if(criterias.idCourse != undefined) assignmentTable[assignmentIndex].idCourse = criterias.idCourse
        if(criterias.nameCourse != undefined) assignmentTable[assignmentIndex].nameCourse = criterias.nameCourse
        if(criterias.deadline != undefined) assignmentTable[assignmentIndex].deadline = criterias.deadline
        
        return 200
    }
}

module.exports = Assignment;
