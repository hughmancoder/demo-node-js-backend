// == entry point to program == 
const Joi = require('joi') // used to validate customer id
Joi.objectId = require('joi-objectid')(Joi);
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const books = require("./routes/books");
const users = require("./routes/users");
const borrows = require("./routes/borrows");
const app = express(); // express object
const mongoose = require("mongoose");
const auth = require('./routes/auth');
const config = require('config'); // make sure environment variable is set

if (!config.get('jwtPrivateKey')) {
    console.log('jwtPrivateKey is not defined set private key via: export bookly_jwtPrivateKey=mySecureKey');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/bookly')
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('Can\'t connect to mongo db'));

// middleware
app.use(express.json()); 
// use listed router for given path
app.use("/api/genres", genres); 
app.use("/api/customers", customers); 
app.use("/api/borrows", borrows); 
app.use("/api/books", books); 
app.use("/api/users", users); 
app.use("/api/auth", auth); 


const private_key = config.get('jwtPrivateKey');
console.log('private key is ' + private_key)

// declaring port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
