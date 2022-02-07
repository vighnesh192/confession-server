const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

var Confession = new Schema({
    username:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('User', User);
module.exports = mongoose.model('Confession',Confession);