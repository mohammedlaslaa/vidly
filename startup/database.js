const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

let datenow = new Date();

module.exports = function() {
  mongoose
    .connect(config.get("db"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() =>
      winston.info(`Connected to the ${config.get("db")}... ${datenow}`)
    );
};
