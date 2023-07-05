const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//object containing database operation functions
const db = require("./database_controller");

app.use(bodyParser.json());

//to workaround CORS errors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
    next();
});

//Return all the stored streamer submissions in response to a request from the frontend.
app.get("/streamers", async(request, response) => {
    console.log("Incoming request GET /streamers")
    try{
        const streamers = await db.getAll();
        response.status(200).json(streamers);
    }catch(err){
        console.error("GET /streamers error: \n" + err.message)
        response.status(500).json({message: err.message});
    }
});

//Return data about a specific streamer
app.get("/streamer/:id", async(request, response) => {
    console.log("Incoming request GET /streamer/id with id " + request.params.id);
    try{
        const streamer = await db.getById(request.params.id);
        if(!streamer) return response.status(404).json({message: `Streamer with id ${request.params.id} not found`});
        response.status(200).json(streamer);
    }catch(err){
        console.error("GET /streamer/id error: \n" + err.message);
        response.status(404).json({message: err.message});
    }
});

//Receive new streamer submissions from the frontend and store them in a database.
app.post("/streamers", async(request, response) => {
    console.log("Incoming request POST /streamers with data: \n" + JSON.stringify(request.body));
    try{
        const newStreamer = await db.add(request.body);
        response.status(201).json(newStreamer);
        console.log("Database input successful");
    }catch(err){
        console.error("POST /streamers error: \n" + err.message);
        response.status(400).json({message: err.message});
    }
});

//Receive a vote for a specific streamer and update their current upvote/downvote count. Operation means either downvote or upvote
app.patch("/streamer/:id/vote", async(request, response) => {
    const {id} = request.params;
    const operation = request.body.operation;
    console.log(`Incoming request PATCH /streamer/id/vote/operation with id ${id} and operation ${operation}`);
    if(operation !== "upvote" && operation !== "downvote") return response.status(400).json({message: `Operation ${operation} not recognized`});
    try{
        const streamer = await db.vote(id, operation);
        if(!streamer) return response.status(404).json({message: `Streamer with id ${id} not found`});
        response.status(200).json(streamer);
    }catch(err){
        console.error("PATCH /streamer/id/vote/operation error: \n" + err.message);
        response.status(500).json({message: err.message});
    }
    
}) 

app.listen(5000, () => {
    db.init();
    console.log("Listening on port 5000"); 
});