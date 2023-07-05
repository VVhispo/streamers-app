import { Streamer } from "./interface"

//In a normal app I would use .env for those variables but I want to keep it simple to install and review the code for you guys
const IP = 'http://localhost'
const PORT = 5000

export const fetchStreamerByID = async(id: string): Promise<Streamer | string> => {
    const response = await fetch(`${IP}:${PORT}/streamer/${id}`);
    const result = response.json();

    if(response.status !== 200) return (await result).message;
    
    return (await result) as Streamer;
}

export const fetchAllStreamers = async(): Promise<Streamer[] | string> => {
    const response = await fetch(`${IP}:${PORT}/streamers`);
    const result = response.json();

    if(response.status !== 200) return (await result).message;

    return (await result) as Streamer[];
}

export const addStreamerFetch = async(data: Streamer): Promise<string> => {
    const headers = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(`${IP}:${PORT}/streamers`, headers);
    const result = response.json();

    if(response.status !== 200) return (await result).message;

    return "success";
}


export const voteStreamer = async(id: string, operation: "upvote" | "downvote"): Promise<string> => {
    const headers = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({operation: operation})
    }
    const response = await fetch(`${IP}:${PORT}/streamer/${id}/vote`, headers);
    const result = response.json();

    if(response.status !== 200) return (await result).message;

    return "success";
} 
