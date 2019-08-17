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
    location:{
        type:String,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
})
module.exports = Profile = mongoose.model('profiles',PorfileSchema)