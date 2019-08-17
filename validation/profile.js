const validator = require("validator");
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
    let errors = {};

    data.profileName = !isEmpty(data.profileName) ? data.profileName : "" ;
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "" ;
    
    if(!validator.isLength(data.profileName,{min:2,max:15})){
        errors.profileName = 'profileName must be between 2 and 15 characters';
    }
   
   
   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}  