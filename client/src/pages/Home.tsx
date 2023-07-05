import React, {useState, useEffect} from 'react'
import { Streamer } from '../interface';
import { fetchAllStreamers } from '../api_controller';
import homeCSS from "./Home.module.css"
import { ButtonList } from '../components/ButtonList';
import { AddingForm } from '../components/AddingForm';
import { addStreamerFetch } from '../api_controller';

export const Home: React.FC = () => {
    const [streamers, setStreamers] = useState<Streamer[]>();
    const [error, setError] = useState<string>("");
    const [addingNew, setAddingNew] = useState<Boolean>(false);

    useEffect(() => {
        if(addingNew) return
        (async() =>{
            const result = await fetchAllStreamers();
            if(typeof result == 'string') setError(result);
            else setStreamers(result);
        })();

        document.title = "Streamers"
    }, [addingNew])

    const switchActive = (platform: string) => {
        if(platform == "New"){
            setAddingNew(true);
            return;
        }
    }

    const addStreamer = async(data: Streamer) => {
        const result = await addStreamerFetch(data);
        if(result !== "success") setError(result);
        setAddingNew(false)
    }

    return(<div className={homeCSS.main} style={{width: (addingNew) ? "50%" : "90%", transition:"0.2s"}}>
        {
            (!addingNew) ? 
            <> 
                <ButtonList onClickFunction={switchActive}/>
            </>
            
            :
            <AddingForm onCancel={setAddingNew} onAdd={addStreamer}/>
        }
    </div>)
}