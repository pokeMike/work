var express = require('express');
var helloRouter = require('./routes/hello.js');
var db = require('./db/index.js');

var app = express();
var port = 3000;

db.sequelize.sync().then(function () {
    console.log('Database connected and synchronized.');

    app.use('/hello', helloRouter);

    app.listen(port, function () {
        console.log('Example app listening at http://localhost:' + port);
    });
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
