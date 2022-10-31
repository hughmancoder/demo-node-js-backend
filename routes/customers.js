const express = require("express");
const router = express.Router();
const { Customer, validate } = require('../models/customer');

// get requests
router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    console.log("getting customers")
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.find(req.params.id);
    if (!customer) return res.status(404).send(`${req.params.id} is not found`);
    res.send(customer);
})

// update material
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    // bad response status code (client format error)
    if (error) return res.status(400).send(error.deatails[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body, 
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {new: true});

    if (!customer) return res.status(404).send('customer with given id is not found and cannot be updated');
    res.send(customer);
});

// post request (post new material)
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.stus(400).send(error.deatails[0].message);

    // create new customer object
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, 
    {
        new: true
    });
    // save object to mongoose database
    customer  = await customer.save();
    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const deleted_customer = await customer.findByIdAndRemove(req.params.id);
    if (!deleted_customer) return res.status(404).send('customer with given id is not found and cannot be updated');
    res.send(deleted_customer);
})

module.exports = router;
