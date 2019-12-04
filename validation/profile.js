const validator = require("validator");
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
    let errors = {};

    data.profileName = !isEmpty(data.profileName) ? data.profileName : "" ;
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "" ;
    data.firstName =  !isEmpty(data.firstName) ? data.firstName : "" ;
    data.bio =  !isEmpty(data.bio) ? data.bio : "" ;
    data.title =  !isEmpty(data.title) ? data.title : "" ;
    data.location =  !isEmpty(data.location) ? data.location : "" ;
    
    if(validator.isEmpty(data.profileName)){
        errors.profileName = 'Please enter your last name';
    }
    if(validator.isEmpty(data.firstName)){
        errors.firstName = 'Please enter your last first name';
    }
    if(!validator.isLength(data.profileName,{min:3,max:15})){
        errors.profileName = 'profileName must be between 2 and 15 characters';
    }
    if(!validator.isLength(data.firstName,{min:3,max:15})){
        errors.firstName = 'firstName must be between 2 and 15 characters';
    }
    if(!validator.isLength(data.phoneNumber,{min:10,max:10})){
        errors.phoneNumber = 'please enter a valid phoneNumber';
    }
    if(validator.isEmpty(data.location)){
        errors.location = 'location can not be empty';
    }
    if(!validator.isLength(data.bio,{min:30,max:150})){
        errors.bio = 'bio must be between 30 and 150 characters';
    }
    
    if(!validator.isLength(data.title,{min:10,max:50})){
        errors.title = 'title must be between 10 and 50 characters';
    }
    if(validator.isEmpty(data.title)){
        errors.title = 'title can not be empty';
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
}  