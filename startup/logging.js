require("express-async-errors"); // adds async middleware try catch to all routes
const winston = require("winston");
module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  winston.add(winston.transports.File, { filename: "logfile.log" }); // used to log errors
};
