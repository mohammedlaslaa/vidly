const winston = require("winston");
const express = require("express");
const app = express();


require("./startup/routes")(app);
require("./startup/database")();
require("./startup/logging")(); 
require("./startup/config")();
require("./startup/validation")(); 
require("./startup/prod")(app);

const port = process.env.PORT || 8010;

const server = app.listen(port, () => {
  console.log('ulyeeee')
  winston.info(`Server listening to the port ${port}`);
});
 
module.exports = server;