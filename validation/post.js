const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = 'Post must be between 10 and 300 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
