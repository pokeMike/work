var express = require('express');
var router = express.Router();
var db = require('../db/index.js');

router.get('/', function (req, res) {
    db.User.findAll().then(function (users) {
        res.json(users);
    }).catch(function (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

router.post('/', function (req, res) {
    db.User.create({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' })
        .then(function (newUser) {
            res.json(newUser);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;
