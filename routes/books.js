const express = require("express");
const router = express.Router();
const { Book, validate } = require('../models/boooks');
const { Genre } = require('../models/genre');

// get requests
router.get('/', async(req, res) => {
    const customers = await Book.find().sort('name');
    res.send(customers);
})

router.get('/:id', async(req, res) => {
    const book = await Book.find(req.params.id);
    if (!book) return res.status(404).send(`${req.params.id} is not found`);
    res.send(book);
})

// fix these functions with refactored code
// update material
/* router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    // bad response status code (client format error)
    if (error) return res.stus(400).send(error.deatails[0].message);

    const book = await Book.findByIdAndUpdate(req.params.id, {
        name: req.body, 
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {new: true});

    if (!book) return res.status(404).send('book with given id is not found and cannot be updated');
    res.send(book);
});

// post request (post new material)
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.stus(400).send(error.deatails[0].message);

    // create new book object
    let book = new Book({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, 
    {
        new: true
    });
    // save object to mongoose database
    book  = await book.save();
    res.send(book);
});

router.delete('/:id', async(req, res) => {
    const deleted_book = await book.findByIdAndRemove(req.params.id);
    if (!deleted_book) return res.status(404).send('book with given id is not found and cannot be updated');
    res.send(deleted_book);
}) */

module.exports = router;
