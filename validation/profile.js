const validator = require("validator");
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
    let errors = {};

    data.profileName = !isEmpty(data.profileName) ? data.profileName : "" ;
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "" ;
    data.location =  !isEmpty(data.location) ? data.location : "" ;
    
    if(!validator.isLength(data.profileName,{min:2,max:15})){
        errors.profileName = 'profileName must be between 2 and 15 characters';
    }
    if(!validator.isLength(data.phoneNumber,{min:8,max:8})){
        errors.phoneNumber = 'please enter a valid phoneNumber';
    }
    if(validator.isEmpty(data.location)){
        errors.location = 'location can not be empty';
    }
   
   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}  