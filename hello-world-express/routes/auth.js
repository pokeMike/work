var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require('../db/index.js');

var JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
router.post('/register', async function (req, res) {
    try {
        var userData = req.body;
        var user = await db.User.create(userData);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Log in an existing user
router.post('/login', async function (req, res) {
    try {
        var { email, password } = req.body;
        var user = await db.User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        var isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        var token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
