var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require('../db/index.js');
var { registerSchema, loginSchema } = require('../validation/user');
var validateRequest = require('../middleware/validationMiddleware');

var JWT_SECRET = process.env.JWT_SECRET;

// Render the registration page
router.get('/register', function (req, res) {
  res.render('register');
});

// Register a new user
router.post(
  '/register',
  validateRequest(registerSchema),
  async function (req, res) {
    try {
      var userData = req.body;
      var user = await db.User.create(userData);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);

// Render the login page
router.get('/login', function (req, res) {
  res.render('login');
});

// Log in an existing user
router.post('/login', validateRequest(loginSchema), async function (req, res) {
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

    var token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
