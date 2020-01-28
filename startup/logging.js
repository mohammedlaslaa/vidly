const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  process.on("uncaughtException", ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", ex => {
    new winston.transports.Console({ colorize : true, prettyPrint: true}),
    winston.error(ex.message, ex);
    process.exit(1);
  });


  // winston.handleExceptions(
  //new winston.transports.Console({ colorize : true, prettyPrint: true})
  //   new winston.transports.File({ filename: "uncaughtExceptions.log" })
  // );

  // process.on("unhandledRejection", ex => {
  //   throw ex;
  // });

  winston.add(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
  winston.add(
    new winston.transports.File({ filename: "info.log", level: "info" })
  );

  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://localhost:27017/vidly",
  //     level: "error"
  //   })
  // );

  // const p = Promise.reject(new Error("qqch ne va pas"));

  // p.then(() => console.log("done"));
};
