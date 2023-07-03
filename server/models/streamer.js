const mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Streamer', streamerSchema);