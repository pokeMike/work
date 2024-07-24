var Joi = require('joi');

var userSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  userSchema: userSchema,
};
