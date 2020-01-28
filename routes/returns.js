const express = require("express");
const authorization = require("../middleware/authorization");
const validate = require("../middleware/validate");
const router = express.Router();
const { Rental } = require("../models/rentalModel");
const { Movie } = require("../models/movieModel");

const Joi = require("joi");

router.post(
  "/",
  [authorization, validate(validateReturn)],
  async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send("Rental not found");
    if (rental.dateReturned)
      return res.status(400).send("Returns already processed");

    rental.return();
    await rental.save();
     
    await Movie.update(
      { _id: rental.movie._id },
      {
        $inc: { numberInStock: 1 }
      }
    );

    return res.send(rental);
  }
);

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
