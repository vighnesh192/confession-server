const mongoose = require('mongoose');

const Sort = new mongoose.Schema({
    sort:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Sort', Sort);