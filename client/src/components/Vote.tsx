import React, {useState, useEffect} from 'react'
import css from "../styles/StreamerCard.module.css"

interface Props{
    currentVoteNumber: number, 
    voteAction: (s: string) => void,
    voteStatus: number,
}

export const Vote: React.FC<Props> = ({currentVoteNumber, voteAction, voteStatus}) => {
    return(<div className={css.voteContainer}>
        <img src="/upvote.png" width={25} height={25} onClick={() => voteAction("upvote")} style={{filter: (voteStatus == 1) ? "brightness(0.3)" : ""}}/>
        <h2>
            {
                currentVoteNumber
            }
        </h2>
        <img src="/downvote.png" width={25} height={25} onClick={() => voteAction("downvote")} style={{filter: (voteStatus == -1) ? "brightness(0.3)" : ""}}/>
    </div>)
}