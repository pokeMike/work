var express = require('express');
var router = express.Router();
var db = require('../db/index.js');
var { userSchema } = require('../validation/hello');
var validateRequest = require('../middleware/validationMiddleware');

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
router.post('/', validateRequest(userSchema), async function (req, res) {
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
