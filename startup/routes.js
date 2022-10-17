const express = require('express');
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const books = require("../routes/books");
const users = require("../routes/users");
const borrows = require("../routes/borrows");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/borrows", borrows);
  app.use("/api/books", books);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
