var Joi = require('joi');

function validateRequest(schema) {
  return (req, res, next) => {
    var { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };
}

module.exports = validateRequest;
