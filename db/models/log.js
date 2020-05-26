const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Log', logSchema);