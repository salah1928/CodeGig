const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    name: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    follows:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'users'
            }
        }
            ],
    date: {
        type:Date,
        default: Date.now
    },
})
module.exports = Shop = mongoose.model(shopSchema,'shops');