const Joi = require("joi"); // input validation
const mongoose = require("mongoose");

// defining db schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

// converting schema to Genre class
const Genre = mongoose.model("Genre", genreSchema);

// helper function which takes in request body and uses Joi module to validate
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
