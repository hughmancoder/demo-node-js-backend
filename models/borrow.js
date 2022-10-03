const Joi = require("joi");
const mongoose = require("mongoose");

const Borrow = mongoose.model(
  "Borrow",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
      book: {
        type: new mongoose.Schema({
          title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255,
          },
          /* numberAvail: {
            type: Number,
            required: False,
            min: 0,
            max: 999,
          }, */
        }),
        required: true,
      },
      tokensRequired: {
        type: Number,
        required: true,
        deafult: 1,
        min: 0,
        max: 10,
      },
    },
  })
);

function validateBorrow(borrow) {
    const schema = {
        customerId: Joi.objectId().required(),
        borrowId: Joi.objectId().required()
    }; 
    return Joi.validate(schema);
}

exports.Borrow = Borrow;
exports.validate = validateBorrow;