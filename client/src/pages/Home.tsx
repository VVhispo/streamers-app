import React, {useState, useEffect} from 'react'
import { Streamer } from '../interface';
import { fetchAllStreamers } from '../api_controller';
import homeCSS from "../styles/Home.module.css";
import { ButtonList } from '../components/ButtonList';
import { AddingForm } from '../components/AddingForm';
import { addStreamerFetch } from '../api_controller';
import { StreamerCard } from '../components/StreamerCard';

export const Home: React.FC = () => {
    const [streamers, setStreamers] = useState<Streamer[]>();
    const [streamersFiltered, setStreamersFiltered] = useState<Streamer[]>();
    const [error, setError] = useState<string>("");
    const [addingNew, setAddingNew] = useState<Boolean>(false);
    const [activeFilter, setFilter] = useState<string>("");


    useEffect(() => {
        if(addingNew) return
        (async() =>{
            const result = await fetchAllStreamers();
            if(typeof result == 'string') setError(result);
            else {
                setStreamers(result);
                setStreamersFiltered(result)
            }
        })();

        document.title = "Streamers"
    }, [addingNew])

    const switchActive = (platform: string) => {
        if(platform == "New"){
            setAddingNew(true);
            return;
        }else if(platform == activeFilter){
            setStreamersFiltered(streamers);
            setFilter("");
        }
        else{
            if(!streamers) return;
            setStreamersFiltered(streamers.filter(streamer => {
                return streamer.platform.toLowerCase() == platform.toLowerCase()
            }))
            setFilter(platform);
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
                <ButtonList onClickFunction={switchActive} filter={activeFilter}/>
                {
                    (!streamersFiltered || streamersFiltered.length == 0) ? 
                    <h1 className={homeCSS.center}>We don't have any {activeFilter && activeFilter + " "} streamers yet!</h1>
                    :
                    <div className={homeCSS.streamersContainer}>
                       {
                            streamersFiltered.map(streamer => {
                                return <StreamerCard key={streamer._id} data={streamer}/>
                            })
                        }
                    </div>

                }
            </>
            :
            <AddingForm onCancel={setAddingNew} onAdd={addStreamer}/>
        }
    </div>)
}