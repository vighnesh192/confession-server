const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Likes_Dislikes = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    confessionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    liked: {
        type: Boolean,
        required: true
    },
    disliked: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Likes_Dislikes', Likes_Dislikes);