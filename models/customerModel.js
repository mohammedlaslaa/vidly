const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 6,
      maxlength: 30,
      required: true
    },
    isGold: {
      type: Boolean,
      default: false
    },
    phone: {
      required: true,
      type: String
    }
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(30)
      .required(),
    phone: Joi.string().required()
  };

  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;

module.exports.validateCustomer = validateCustomer;
