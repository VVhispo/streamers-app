const mongoose = require('mongoose');

const Streamer = require("./models/streamer");

module.exports = {
    init: () => {
        mongoose.connect('mongodb://localhost/streamers');
        const db = mongoose.connection;
        db.on('error', (error) => console.error("Database error: \n" + error));
        db.once('open', () => console.log("Connected to database"));
    },
    getAll: async() => {
        const streamers = await Streamer.find();
        return streamers;
    },
    add: async(data) => { 
        const {name, platform, description} = data;
        const streamer = new Streamer({
            name: name,
            platform: platform,
            description: description
        });
        const newStreamer = await streamer.save();
        return newStreamer;
    },
    getById: async(id) => {
        const streamer = await Streamer.findById(id);
        return streamer;
    },
    vote: async(id, operation) => {
        const streamer = await Streamer.findById(id);
        if(!streamer) return null;
        if(operation === "upvote") streamer.votes += 1;
        else if(operation === "downvote") streamer.votes -= 1;
        const updatedStreamer = await streamer.save();
        return updatedStreamer;
    },
    
}