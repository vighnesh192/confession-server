const mongoose = require('mongoose');

const Confession = new mongoose.Schema({
    college :{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})
module.exports = mongoose.model('Confession', Confession);