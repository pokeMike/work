var Sequelize = require('sequelize');
var UserModel = require('../models/user.js');

var sequelize = new Sequelize('hello_world_db', 'postgres', 'postgres', {
    host: '127.0.0.1',
    dialect: 'postgres'
});

var User = UserModel(sequelize, Sequelize);

var db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: User
};

module.exports = db;
