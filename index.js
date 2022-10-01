// entry point to program
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers")
const app = express(); // express object
const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/bookly')
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('Can\'t connect to mongo db'));


app.use(express.json()); // middleware
app.use("/api/genres", genres); // use genre router for listed path
app.use("/api/customers", customers); // use customer router for listed path

// declaring port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

