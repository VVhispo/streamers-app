import React, {useState, useEffect} from 'react'
import buttonListCSS from "../styles/ButtonList.module.css"

interface Props{
    onClickFunction: (s: string) => void,
    filter: string
}

export const ButtonList: React.FC<Props> = ({onClickFunction, filter}) => {
    return(
        <div className={buttonListCSS.btnsContainer}>
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_new} 
                onClick={() => onClickFunction("New")}>+</button> 

            <button className={`${buttonListCSS.btn} ${buttonListCSS.btn_twitch} ${(filter == "Twitch") && buttonListCSS.active}`} 
                onClick={() => onClickFunction("Twitch")}></button>

            <button className={`${buttonListCSS.btn} ${buttonListCSS.btn_youtube} ${(filter == "YouTube") && buttonListCSS.active}`} 
                onClick={() => onClickFunction("YouTube")}></button>

            <button className={`${buttonListCSS.btn} ${buttonListCSS.btn_kick} ${(filter == "Kick") && buttonListCSS.active}`} 
                onClick={() => onClickFunction("Kick")}></button>

            <button className={`${buttonListCSS.btn} ${buttonListCSS.btn_tiktok} ${(filter == "TikTok") && buttonListCSS.active}`} 
                onClick={() => onClickFunction("TikTok")}></button>

            <button className={`${buttonListCSS.btn} ${buttonListCSS.btn_rumble} ${(filter == "Rumble") && buttonListCSS.active}`} 
                onClick={() => onClickFunction("Rumble")}></button>
        </div>)
}