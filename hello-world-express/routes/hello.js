var express = require('express');
var router = express.Router();
var db = require('../db/index.js');

// GET to fetch users
router.get('/', async function (req, res) {
    try {
        var users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST to create a new user
router.post('/', async function (req, res) {
    try {
        var userData = req.body;
        var newUser = await db.User.create(userData);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
