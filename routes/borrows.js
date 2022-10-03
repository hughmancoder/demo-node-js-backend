const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const { Borrow, validate } = require('../models/borrow');
const { Book } = require('../models/book');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const borrow = await Borrow.find(req.body);
    res.send(borrow);
});

router.get('/:id', async (req, res) => {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) res.status(404).send('Book with given id not found');
    res.send(borrow);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const book = await Book.findById(req.body.movieId);
    if (!book) return res.status(400).send('Invalid book');
  
    if (book.numberAvail === 0) return res.status(400).send('No book requested is available');
  
    let borrow = new Borrow({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      book: {
        _id: book._id,
        title: book.title,
      }
    });

    // creating a transaction through a task object (name of connection, object to create)
    try {
      new Fawn.Task()
      .save('borrows', borrow)
      .update('books', { _id: movie._id}, { $inc: { numberInStock: -1 }})
      .run();
    }
    catch(ex) {
      console.log(ex);
      res.status(500).send('Internal server error');
    }
    
    res.send(borrow);
  });
  
  module.exports = router; 