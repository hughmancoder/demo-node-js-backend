const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require("express");
const router = express.Router();
const { validate, Genre } = require('../models/genre');

router.get("/", async (req, res) => {
  const book_genres = await Genre.find().sort("name");
  res.send(book_genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send(`${req.params.id} is not found`);
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  // we never trust user input hence we validate before processing
  console.log("put request called for id ", req.params.id);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // can wrap req.body in try block to test if format is correct
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

// adds a new resource to the request; we add auth as an optional middleware function; we add auth as we want to ensure protection of post request
router.post("/", auth, async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

// use auth and admin middleware functions
router.delete("/:id", [auth, admin], async (req, res) => {
  console.log("deleting user with id: " + req.params.id);
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  console.log(`deleted ${genre}`)
  res.send(genre);
});

module.exports = router;
