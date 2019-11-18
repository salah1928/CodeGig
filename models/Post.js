const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    technologies: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:false
    },
    date: {
        type:Date,
        default: Date.now
    },
})
module.exports = Post = mongoose.model('posts',postSchema);