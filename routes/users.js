// _ JavaScript utility library delivering modularity, performance & extras
const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const { validate, User } = require('../models/user');

// get current user from json web token; protected authentication middleware ensures valid token
router.get('/me',auth, async (req, res) => {
  // we want to exclude password 
  const userObj = await User.findById(req.user._id).select('-password');
  res.send(userObj);
});

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
  const token = user.generateAuthToken();
  // we prefix with x- as convention and store token as a header which is stored on client side (so they don't have to reenter password). Pick fucntion gets a copy of object for selected properties
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router
