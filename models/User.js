const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
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

module.exports = mongoose.model('User', User);