const Joi = require('joi');  // input validation
const express = require('express');
const app = express(); // express object

app.use(express.json()) // middleware

// server usually handles this
const book_genres = [
 {id:1, name: "Action"},
 {id:2, name: "Philosophy"},
 {id:3, name: "Self help"}, 
 {id:4, name: "Relationships"}
]

// helper function which takes in request body and uses Joi module to validate
function validateGenre(genre) {
    const schema = { 
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

app.get('/api/genres', (req, res) => {
    res.send(book_genres);
});

// get genre from given id
app.get('/api/genres/:id', (req, res) => {
    // check if id is valid, === includes type
    const genre = book_genres.find(i => i.id  === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`${req.params.id} is not found`);
    res.send(genre)
});

// updates a resource
app.put('/api/genres/:id', (req, res) => {
    console.log("put request called for id ", req.params.id)
    const genre = book_genres.find(i => i.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`error ${req.params.id} does not exist`);

    // we never trust user input hence we validate before processing
    console.log("request body ", req.body)
    const { error } =  validateGenre(req.body);
    if (error) {
        console.log("error in put request", error.details[0].message);
    }
    if (error) return res.status(400).send(error.details[0].message);

    // update genre name
    genre.name = req.body.name;
    // as a demo
    console.log(req.body)
    // send updated genre object
    res.send(genre);
});

// adds a new resource to the request`
app.post('/api/genres', (req, res) => {
    console.log(req.body)
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: book_genres.length + 1,
        name: req.body.name
    }
    book_genres.push(genre)
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = book_genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const index = book_genres.indexOf(genre);
    book_genres.splice(index);
    res.send(book_genres)

});

// declaring port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// run: nodemon index.js
