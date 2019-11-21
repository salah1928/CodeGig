const validator = require("validator");
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data) {
    let errors = {};

    
    data.email = !isEmpty(data.email) ? data.email : "" ;
    data.password = !isEmpty(data.password) ? data.password : "" ;
    data.password2 = !isEmpty(data.password2) ? data.password2 : "" ;


   
    
    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is empty';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'This is not a valid email';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is empty';
    }
    if(!validator.isLength(data.password , {min:6})){
        errors.password = 'Password must be at least 6 letters';
    }
    if(validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password field is empty';
    }
    if(!validator.equals(data.password , data.password2)){
        errors.password2 = 'Password fields must match';
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}