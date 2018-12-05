const express = require('express');
const Book = require('../models/book');

const booksRoute = express.Router(); 

booksRoute.route('/')

//get all the book
.get(async function(req, res) {
    var books = new Book()
    books = await Book.find(req.query)
    if(books == undefined)
        res.status(400).send('Error, something went wrong')

    res.status(200).json(books)
})

//create an book
.post(async function(req, res){
    var book = new Book()
    book.title = req.body.title
    book.firstPrice = req.body.firstPrice
    book.lastPrice = req.body.lastPrice
    book.deadline = req.body.deadline
    book.sold = req.body.sold
    if(book.title === undefined || book.firstPrice === undefined || book.lastPrice === undefined
        || book.deadline === undefined || book.sold === undefined){               
        res.status(403).send('Error 403: Not all parameters given')
    }else{
        Book.addBook(book)
        res.status(201).send('Success: book inserted')
    }
})

//it is to prevent a bug
.delete(async function(req, res){
    res.status(400).send("Error 400: no parameters given")
})
//it is to prevent a bug
.put(async function(req, res){
    res.status(400).send("Error 400: no parameters given")
})

booksRoute.route('/:id')
//delete an book
.delete(async function(req, res){
    let result = await Book.delete(req.params.id)
    if(result == 200){
        res.status(200).send('Success: book deleted')
    }        
    else if(result == 404){
        res.status(404).send('Error 404: element not found')
    }
})

//update an book
.put(async function (req, res) { 
    var editBook = new Book()

    editBook.id = req.params.id   
    editBook.title = req.body.title
    editBook.firstPrice = req.body.firstPrice
    editBook.lastPrice = req.body.lastPrice
    editBook.deadline = req.body.deadline
    editBook.sold = req.body.sold

    let result = await Book.put(editBook)
    
    if(result === 200)
        res.status(200).send('Success update')
    else if(result === 404)
        res.status(404).send('Error 404: element not found')
})

module.exports = booksRoute;