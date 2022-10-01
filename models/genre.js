const Joi = require("joi"); // input validation
const mongoose = require("mongoose");

// defining db schema
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

// converting schema to Genre class
const Genre = mongoose.model("Genre", bookSchema);

// helper function which takes in request body and uses Joi module to validate
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
