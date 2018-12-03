var uniqid = require('uniqid');

var workgroupsTable = global.workgroupsTable;
if(workgroupsTable == undefined)
    workgroupsTable = [];

class Workgroup{
    //return all workgroups
    static async getAllWorkgroups(){        
        return workgroupsTable;
    }
    //add a new exam
    static async addWorkgroups(criterias){  
        criterias.id = uniqid();
        workgroupsTable.push(criterias);
    }
}

module.exports = Workgroup;