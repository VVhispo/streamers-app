import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Streamer } from '../interface';
import { fetchStreamerByID } from '../api_controller';
import streamerCSS from "./StreamerPage.module.css"

export const StreamerPage: React.FC = () => {
    const [streamerData, setStreamerData] = useState<Streamer>();
    const [error, setError] = useState<string>("");
    const { streamerID }  = useParams()

    useEffect(() => {
        (async() =>{
            const result = await fetchStreamerByID(streamerID || "");
            if(typeof result == 'string') setError(result);
            else setStreamerData(result);
        })();
    }, [])

    useEffect(() => {
        document.body.style.background = `url("../../public/backgrounds/${streamerData?.platform.toLowerCase()}_background.png") no-repeat center center fixed`;
        document.title = "Streamer " + streamerData!.name
    }, [streamerData])
    


    return(<div>
        <div className={streamerCSS.main}>
            {
                (streamerData) ? 
                <>
                    <div className={streamerCSS.profile_img_container}>
                    <img className={streamerCSS.profile_img} src="/basic_user.png" alt="profile pic" width={350} height={350}/>
                    </div>
                    <div className={streamerCSS.profile_data_container}>
                        <div className={streamerCSS.profile_data_header}>
                            <h1>{streamerData.name}</h1>
                            <img src={`/logos/${streamerData.platform.toLowerCase()}_logo.png`} alt={streamerData.platform} width={70}/>
                        </div>
                        <hr />
                        <p>{streamerData.description}</p>
                    </div>
                </>
                :
                <div className={streamerCSS.loading_container + " " + streamerCSS.center}>
                    {(error) ? <h1>404 Streamer not found!</h1> : <h1>Loading...</h1>}
                </div>
            }
        </div>
    </div>)
}