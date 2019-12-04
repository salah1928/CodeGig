const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};
  
  data.technologies = data.technologies.split(",");

  data.description = !isEmpty(data.description) ? data.description : '';
  data.technologies = !isEmpty(data.technologies) ? data.technologies : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  
  const techvalid = data.technologies.length;

  if (!data.technologies, { min: 2, max: 6 }) {
    
    if (data.technologies.length < 2){
      errors.technologies = 'Please chose at least 2 technologies';
    }
    else if (data.technologies.length > 6){
      errors.technologies = 'You can only chose up to 6 technologies';
    }
  }
  if (!Validator.isLength(data.title, { min: 15, max: 50 })) {
    errors.title = 'Post title must be between 15 and 50 characters';
  }
 
  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = 'Post description must be between 10 and 300 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
