import React, {useState} from 'react'
import buttonListCSS from "./ButtonList.module.css"

interface Props{
    onClickFunction: (s: string) => void,
}

export const ButtonList: React.FC<Props> = ({onClickFunction}) => {
    return(
        <div className={buttonListCSS.btnsContainer}>
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_new} onClick={() => onClickFunction("New")}>+</button> 
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_twitch} onClick={() => onClickFunction("Twitch")}></button>
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_youtube} onClick={() => onClickFunction("YouTube")}></button>
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_kick} onClick={() => onClickFunction("Kick")}></button>
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_tiktok} onClick={() => onClickFunction("TikTok")}></button>
            <button className={buttonListCSS.btn + " " + buttonListCSS.btn_rumble} onClick={() => onClickFunction("Rumble")}></button>
        </div>)
}