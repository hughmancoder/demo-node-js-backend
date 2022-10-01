const express = require("express");
const router = express.Router();
const Joi = require("joi"); // input validation
const mongoose = require("mongoose");

// defining db schema 
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
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

router.get("/", async (req, res) => {
  const book_genres = await Genre.find().sort("name");
  res.send(book_genres);
});

// get genre from given id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);
  res.send(genre);
});

// updates a resource
router.put("/:id", async (req, res) => {
  // we never trust user input hence we validate before processing
  console.log("put request called for id ", req.params.id);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!genre) return res.status(404).send(`error ${req.params.id} does not exist`);
  res.send(genre);
});

// adds a new resource to the request`
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  console.log(`deleted ${genre}`)
  res.send(genre);
});

module.exports = router;
