var uniqid = require('uniqid');

var professorsTable = global.professorsTable
if ( professorsTable == null )
    professorsTable = [];

class Professor{
    //get all professor
    static async getAll(){        
        return professorsTable;
    }

    //get all professor
    static async find(criterias){        
        var professors = professorsTable.filter(u => {
            return criterias.name == undefined ? true : u.name === criterias.name
            &&     criterias.email == undefined ? true : u.email === criterias.email
			&&     criterias.id == undefined ? true : u.id === criterias.id
        });
        return professors
    }

    //find professor by name
    static async findByName(name){
        var professors = professorsTable.filter(u => {
            return u.name === name
        });
        return professors
    }

    //adding a professor
    static async addProfessor(criterias){  
        criterias.id = uniqid();
        professorsTable.push(criterias);
    }

    //delete a professor
    static async delete(criterias){ 
        let professorIndex = professorsTable.findIndex(e => e.id === criterias)
        if(professorIndex == -1)
            return 404
        
        professorsTable.splice(professorIndex, 1)
        return 200
         
    }

    //update a professor
    static async put(criterias){
        let professorIndex = professorsTable.findIndex(e => e.id === criterias.id)
        if(professorIndex == -1)
            return 404

        if(criterias.name != undefined) professorsTable[professorIndex].name = criterias.name
        if(criterias.email != undefined) professorsTable[professorIndex].email = criterias.email
        if(criterias.password != undefined) professorsTable[professorIndex].password = criterias.password
        
        return 200
    }
}

module.exports = Professor;