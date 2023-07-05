import React, {useState, useEffect} from 'react'
import { Streamer } from '../interface';
import { fetchAllStreamers } from '../api_controller';
import homeCSS from "./Home.module.css"
import { ButtonList } from '../components/ButtonList';
import { AddingForm } from '../components/AddingForm';

export const Home: React.FC = () => {
    const [streamers, setStreamers] = useState<Streamer[]>();
    const [error, setError] = useState<string>("");
    const [addingNew, setAddingNew] = useState<Boolean>(false);

    useEffect(() => {
        (async() =>{
            const result = await fetchAllStreamers();
            if(typeof result == 'string') setError(result);
            else setStreamers(result);
        })();

        document.title = "Streamers"
    }, [])

    const switchActive = (platform: string) => {
        if(platform == "New"){
            setAddingNew(true);
            return;
        }
    }

    return(<div className={homeCSS.main}>
        {
            (!addingNew) ? 
            <ButtonList onClickFunction={switchActive}/>
            :
            <AddingForm onCancel={setAddingNew}/>
        }
    </div>)
}