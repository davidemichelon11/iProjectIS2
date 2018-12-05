var uniqid = require('uniqid');

var bookTable = global.bookTable
if (bookTable == null )
    bookTable = [];

class Book{
    //get all book
    static async getAll(){        
        return bookTable;
    }

    //get all book
    static async find(criterias){        
        var books = bookTable.filter(u => {
            return criterias.id == undefined ? true : u.id === criterias.id
            &&     criterias.title == undefined ? true : u.title === criterias.title
            &&     criterias.firstPrice == undefined ? true : u.firstPrice === criterias.firstPrice
            &&     criterias.lastPrice == undefined ? true : u.lastPrice === criterias.lastPrice
            &&     criterias.deadline == undefined ? true : u.deadline === criterias.deadline
            &&     criterias.sold == undefined ? true : u.obligatory === criterias.sold
        });
        return books
    }

    //adding a book
    static async addBook(criterias){  
        criterias.id = uniqid();
        bookTable.push(criterias);
    }

    //delete a book
    static async delete(criterias){ 
        let bookIndex = bookTable.findIndex(e => e.id === criterias)
        if(bookIndex == -1)
            return 404
        
        bookTable.splice(criterias, 1)
        return 200
         
    }

    //update a book
    static async put(criterias){
        let bookIndex = bookTable.findIndex(e => e.id === criterias.id)
        if(bookIndex == -1)
            return 404
        if(criterias.title != undefined) bookTable[bookIndex].title = criterias.title
        if(criterias.firstPrice != undefined) bookTable[bookIndex].firstPrice = criterias.firstPrice
        if(criterias.lastPrice != undefined) bookTable[bookIndex].lastPrice = criterias.lastPrice
        if(criterias.deadline != undefined) bookTable[bookIndex].deadline = criterias.deadline
        if(criterias.sold != undefined) bookTable[bookIndex].sold = criterias.sold
        
        return 200
    }
}

module.exports = Book;
