import React, {useState, useEffect} from 'react'
import formCSS from "./AddingForm.module.css" 
import { Streamer } from '../interface'

interface Props{
    onCancel: (b: Boolean) => void,
    onAdd: (s: Streamer) => void,
}

export const AddingForm: React.FC<Props> = ({onCancel, onAdd}) => {

    const [name, setName] = useState<string>("");
    const [description, setDesc] = useState<string>("");
    const [platform, setPlatform] = useState<string>("Twitch");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if(name.length > 15){
            setName(name.slice(0, -1));
        }else if(name.length > 0 && error == "name"){
            setError("");
        }
    }, [name]) 

    useEffect(() => {
        if(description.length > 0 && error == "description"){
            setError("");
        }
    }, [description]) 

    const validateFields = () =>{
        if(name && description){
            const streamer: Streamer = {
                name: name,
                platform: platform,
                description: description,
                votes: 0
            }
            onAdd(streamer);
        }else if(!name){
            setError("name");
        }else if(!description){
            setError("description")
        }
    }


    return(<div className={formCSS.main}>
        <h2>Add a new streamer</h2>
        <p>What's their name and where do they stream?</p>
        <div className={formCSS.headerInputs}>
            <div>
                <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} className={formCSS.input + " " + formCSS.input_name + " " + ((error == "name") && formCSS.input_error)}/>
            </div>
            <div className={formCSS.selectContainer}>
                <select value={platform} onChange={e => setPlatform(e.target.value)} className={formCSS.selectInput}>
                    <option className={formCSS.selectOption } value="Twitch">Twitch</option>
                    <option className={formCSS.selectOption } value="YouTube">YouTube</option>
                    <option className={formCSS.selectOption } value="Kick">Kick</option>
                    <option className={formCSS.selectOption } value="TikTok">TikTok</option>
                    <option className={formCSS.selectOption } value="Rumble">Rumble</option>
                </select>
                <div style={{backgroundImage: `url("../../public/logos/${platform.toLowerCase()}_logo_small.png")`}} className={formCSS.selectValueIcon}></div>
            </div>
        </div>
        <p>Tell us something about them</p>
        <textarea rows={3} value={description} placeholder="description" onChange={e => setDesc(e.target.value)} className={formCSS.input + " " + formCSS.input_description + " " + ((error == "description") && formCSS.input_error)}></textarea>
        <div className={formCSS.buttons}>
            <button className={formCSS.btn + " " + formCSS.btn_add} onClick={validateFields}>add</button>
            <button className={formCSS.btn + " " + formCSS.btn_cancel} onClick={() => onCancel(false)}>cancel</button>
        </div>

    </div>)
}