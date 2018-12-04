var uniqid = require('uniqid');

var workgroupsTable = global.workgroupsTable;
if(workgroupsTable == undefined)
    workgroupsTable = [];

class Workgroup{
    //get all workgroups
    static async find(criterias){        
        var workgroups = workgroupsTable.filter(u => {
            return criterias.id == undefined ? true : u.id === criterias.id
            &&     criterias.name == undefined ? true : u.name === criterias.name
            &&     criterias.member == undefined ? true : u.member === criterias.member
        });
        return workgroups
    }
    //add a new workgroup
    static async addWorkgroups(criterias){  
        criterias.id = uniqid();
        workgroupsTable.push(criterias);
    }

    //delete a workgroup
    static async delete(criterias){
        let matchingIndex = workgroupsTable.findIndex(e => e.id === criterias)
        if(matchingIndex == -1)
            return 404

        workgroupsTable.splice(criterias, 1)
        return 200
    }

    //update an assignment
    static async put(criterias){
        let assignmentIndex = workgroupsTable.findIndex(e => e.id === criterias.id)
        if(assignmentIndex == -1)
            return 404
            
        if(criterias.name != undefined) workgroupsTable[assignmentIndex].name = criterias.name
        if(criterias.members != undefined) workgroupsTable[assignmentIndex].members = criterias.members
        
        return 200
    }
}

module.exports = Workgroup;