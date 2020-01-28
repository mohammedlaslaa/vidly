const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.info(err.message, err);
  //Log the exception
  res.status(500).send("Something failed.");
};
