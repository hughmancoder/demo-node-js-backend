// _ JavaScript utility library delivering modularity, performance & extras
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require("express");
const router = express.Router();
const { User } = require('../models/user');

router.post("/", async (req, res) => {
  
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user is not already registered by looking user up by one of their properties
  // we don't want to tell the client if email is valid or not so we don't send 404 error 
  let user = await User.findOne( { email: req.body.email });
  if (!user) return res.status(400).send('invalid email or password');
  
  //  console.log("req body", req.body);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('invalid email or password');

  // generation handled by user object
 const token = user.generateAuthToken();
 res.send(token);
});

function validate(req) {
    const schema = { 
        email: Joi.string().min(5).max(255).required().email(),  // make sure valid email
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(req, schema);
}

module.exports = router
