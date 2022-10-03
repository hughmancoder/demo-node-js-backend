const express = require("express");
const router = express.Router();
const { Book, validate } = require("../models/book");
const { Genre } = require("../models/genre");

// get requests
router.get("/", async (req, res) => {
  const customers = await Book.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const book = await Book.find(req.params.id);
  if (!book) return res.status(404).send(`${req.params.id} is not found`);
  res.send(book);
});

// fix these functions with refactored code
// update material
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.stus(400).send(error.deatails[0].message);

  const { genre } = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      daily: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!book)
    return res
      .status(404)
      .send("book with given id is not found and cannot be updated");
  res.send(book);
});

// post request (post new material)
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.stus(400).send(error.deatails[0].message);

  const { genre } = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  // create new book object
  const book = new Book({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberAvail: req.body.numberAvail,
  });
  // save object to mongoose database
  await book.save();
  res.send(book);
});

router.delete("/:id", async (req, res) => {
  const deleted_book = await book.findByIdAndRemove(req.params.id);
  if (!deleted_book) return res.status(404).send("book with given id is not found and cannot be updated");
  res.send(deleted_book);
});

module.exports = router;
