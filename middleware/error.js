const winston = require('winston'); // used for error logging
// handling errors (middleware)
module.exports = function(err,req, res, next){
    winston.error(err.message, err);
    // server failed
    res.status(500).send("something failed!");
}
