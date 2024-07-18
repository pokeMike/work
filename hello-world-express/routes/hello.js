var express = require('express');
var router = express.Router();
var db = require('../db/index.js');

// GET route 
router.get('/', function (req, res) {
    db.User.findAll().then(function (users) {
        res.json(users);
    }).catch(function (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

// POST route 
router.post('/', function (req, res) {
    var userData = req.body;

    db.User.create(userData)
        .then(function (newUser) {
            res.json(newUser);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
