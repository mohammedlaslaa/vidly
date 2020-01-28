const { Customer, validateCustomer } = require("../models/customerModel");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({ name: req.body.name, phone: req.body.phone });
  await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
      { new: true }
    );
    res.send(customer);
  } catch (err) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const customer = await Customer.findByIdAndRemove(id);
    res.send(customer);
  } catch (err) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
});

module.exports = router;
