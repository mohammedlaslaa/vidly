const express = require('express')
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const movies = require("../routes/movies");
const auth = require("../routes/auth");
const returns = require("../routes/returns");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/film/genres", genres);
  app.use("/api/film/customers", customers);
  app.use("/api/film/movies", movies);
  app.use("/api/film/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
};
