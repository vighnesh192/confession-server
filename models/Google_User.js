const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var googleUser = new Schema({
    googleId: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('googleUser', googleUser);