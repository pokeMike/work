var express = require('express');
var router = express.Router();
var db = require('../db/index.js');
var { userSchema } = require('../validation/hello');

// GET route to fetch all users
router.get('/', async function (req, res) {
    try {
        var users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to create a new user
router.post('/', async function (req, res) {
    try {
        var { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        var userData = req.body;
        var newUser = await db.User.create(userData);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
