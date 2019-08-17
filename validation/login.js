const validator = require("validator");
const isEmpty = require('./is-empty');
module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "" ;
    data.password = !isEmpty(data.password) ? data.password : "" ;


   
    if(!validator.isEmail(data.email)){
        errors.email = 'This is not a valid email';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is empty';
    }
    
    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is empty';
    }
    
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
}  