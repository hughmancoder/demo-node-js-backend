const Joi = require("joi"); 
const mongoose = require("mongoose");
const { genreSchema } = require('./genre');

const Book = mongoose.model("Books", new mongoose.Schema({
title: {
    type: String,
    required: true,
    trim: true, // trim removes whitespace
    minlength: 5,
    maxlength: 255
},
genre: {
    type: genreSchema,
    required: true
},
numberAvail: { 
    type: Number, 
    required: true,
    min: 0,
    max: 999
},
averageRating: { 
type: Number, 
required: False,
min: 0,
max: 5
}
}));

// takes in request body (object)
function validateBook(bookObj) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberAvail: Joi.number().min(0).max(999).required(),
        averageRating: Joi.number().min(0).required()
    };
    return Joi.validate(bookObj, schema);
}

exports.validate = validateBook;
exports.Book = Book;