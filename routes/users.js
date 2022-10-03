// _ JavaScript utility library delivering modularity, performance & extras
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { validate, User } = require('../models/user');

router.post("/", async (req, res) => {
  
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user is not already registered by looking user up by one of their properties
  let user = await User.findOne( { email: req.body.email });
  if (user) return res.status(400).send('user already registered');

  // save user in database
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  
  // encrypt password
  const salt =  await bcrypt.genSalt(10) 
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  
  // pick only specific properties
  // userSelection = await user.save();

  const private_key = config.get('jwtPrivateKey');
  console.log('private key is: ', private_key);
  const token = jwt.sign({ _id: user._id }, private_key);

  // we prefix with x- as convention and store token as a header which is stored on client side (so they don't have to reenter password)
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router
