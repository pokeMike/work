var jwt = require('jsonwebtoken');

var JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    var token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        req.user = decoded;
        next();
    });
};
