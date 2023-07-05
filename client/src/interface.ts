export interface Streamer{
    id: string,
    name: string, 
    platform: "Twitch" | "YouTube" | "Kick" | "TikTok" | "Rumble",
    description: string,
    votes: number
}