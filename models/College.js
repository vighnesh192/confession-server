const mongoose = require('mongoose');

const College = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    }
});

module.exports = mongoose.model('College', College);