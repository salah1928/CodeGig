const mongoose = require('mongoose');

const PorfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    profileName:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    location:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
    },
})
module.exports = Profile = mongoose.model('profiles',PorfileSchema)