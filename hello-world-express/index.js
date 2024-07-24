require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var helloRouter = require('./routes/hello.js');
var authRouter = require('./routes/auth.js');
var authMiddleware = require('./middleware/auth.js');
var db = require('./db/index.js');

var app = express();
var port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

(async function () {
  try {
    await db.sequelize.sync();
    console.log('Database connected and synchronized.');

    app.use('/auth', authRouter);
    app.use('/hello', authMiddleware, helloRouter);

    app.listen(port, function () {
      console.log('Example app listening at http://localhost:' + port);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
