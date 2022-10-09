// sign in model
const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config'); // make sure environment variable is set

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

// add a new method to user object
userSchema.methods.generateAuthToken = function() {
  const private_key = config.get('jwtPrivateKey');
  // generates our token
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, private_key);
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = { 
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),  // make sure valid email
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;