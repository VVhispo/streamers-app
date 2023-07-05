import React, {useState, useEffect} from 'react'
import { Streamer } from '../interface';
import cardCSS from '../styles/StreamerCard.module.css'
import { Vote } from './Vote';
import { voteStreamer, fetchStreamerByID } from '../api_controller';

interface Props{
    data: Streamer;
}
 
export const StreamerCard: React.FC<Props> = ({data}) => {
    const [voteStatus, setVoteStatus] = useState<number>();
    const [streamerData, setStreamerData] = useState<Streamer>(data);

    const updateStreamerData = async() => {
        const result = await fetchStreamerByID(data._id!);
        if(typeof result == 'string') return
        setStreamerData(result)
    }

    const vote = async(operation: string) =>{
        if(voteStatus == 0 || !voteStatus){
            const result = await voteStreamer(streamerData._id!, operation as "downvote" | "upvote")
            if(result == "success" && operation == "upvote") setVoteStatus(1)
            else if(result == "success" && operation == "downvote") setVoteStatus(-1)
            else return
        }else if(voteStatus == -1){
            if(operation == "upvote"){
                for(let i=0; i<2; i++){
                    const result = await voteStreamer(streamerData._id!, "upvote")
                    if(result !== "success") return
                }
                setVoteStatus(1)
            }else if(operation == "downvote"){
                const result = await voteStreamer(streamerData._id!, "upvote")
                if(result == "success") setVoteStatus(0)
            }
        }
        else if(voteStatus == 1){
            if(operation == "downvote"){
                for(let i=0; i<2; i++){
                    const result = await voteStreamer(streamerData._id!, "downvote")
                    if(result !== "success") return
                }
                setVoteStatus(-1)
            }else if(operation == "upvote"){
                const result = await voteStreamer(streamerData._id!, "downvote")
                if(result == "success") setVoteStatus(0)
            }
        }
    }

    useEffect(() => {
        if(typeof voteStatus == "undefined") return
        localStorage.setItem(streamerData._id!, voteStatus.toString())
        updateStreamerData();
    }, [voteStatus])

    //load user's votes from localStorage
    useEffect(() => {
        const vote = localStorage.getItem(streamerData._id!);
        if(!vote) return;
        setVoteStatus(parseInt(vote));
    }, [])

    return(<div className={cardCSS.main}>
        <a href={"/" + streamerData._id}><img src="/basic_user.png" alt="profile pic" width={125} height={125} className={cardCSS.profilePic}/></a>
        <img src={`/logos/${streamerData.platform.toLowerCase()}_logo_small.png`} alt="platform pic" width={40} height={40} className={cardCSS.platformImage}/>
        <h3 style={{fontSize: 80 * ((15 - streamerData.name.length) / 12 + 1) + "%"}}>{streamerData.name}</h3>
        <Vote currentVoteNumber={streamerData.votes} voteAction={vote} voteStatus={voteStatus ? voteStatus : 0} />
    </div>)
}