const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Google_User = new Schema({
    googleId: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Google_User', Google_User);