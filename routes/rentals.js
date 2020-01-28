const { Rental, validateRental } = require("../models/rentalModel");
const { Movie } = require("../models/movieModel");
const { Customer } = require("../models/customerModel");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid Customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie.");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });

    // rental = await rental.save();

    // movie.numberInStock--;
    // movie.save();

    // Transactions with mongoose and fawn npm module

    // try {
    //   new Fawn.Task()
    //     .save("rentals", rental)
    //     .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    //     .run();
    // } catch (ex) {
    //   res.status(500).send("Something Failed");
    // }

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await rental.save();
      movie.numberInStock--;
      movie.save();
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).send("Error");
    }
    res.send(rental);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
