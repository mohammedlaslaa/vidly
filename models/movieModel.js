const mongoose = require("mongoose");
const Joi = require("joi");
const {genreSchema} = require('./genreModel')


const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 6,
      maxlength: 150,
      trim: true,
      required: true
    },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, default: 0, min : 0, max:255},
    dailyRentalRate: { type: Number, default: 0, min:0, max:255 }
  })
);

function validateMovie(genre) {
  const schema = {
    title: Joi.string()
      .min(6)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().integer(),
    dailyRentalRate: Joi.number().integer()
  };

  return Joi.validate(genre, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
