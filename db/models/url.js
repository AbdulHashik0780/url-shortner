const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        default: shortId.generate
    },
    noOfVisits: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Url', urlSchema)