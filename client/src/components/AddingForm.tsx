import React, {useState, useEffect, useRef} from 'react'
import formCSS from "./AddingForm.module.css" 

interface Props{
    onCancel: (b: Boolean) => void,
}

export const AddingForm: React.FC<Props> = ({onCancel}) => {

    const [name, setName] = useState<string>("");
    const [description, setDesc] = useState<string>("");
    const [platform, setPlatform] = useState<string>("Twitch");

    const textArea = useRef();

    useEffect(() => {
        if(name.length > 15){
            setName(name.slice(0, -1));
        }
    }, [name]) 

    function handleKeyDown(e: any) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 90)}px`;
      }

    return(<div className={formCSS.main}>
        <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} className={formCSS.input + " " + formCSS.input_name}/>
        <textarea rows={2} placeholder="description" onChange={e => setDesc(e.target.value)} className={formCSS.input + " " + formCSS.input_description} onInput={e => {handleKeyDown(e)}}>{description}</textarea>
        <select value={platform} onChange={e => setPlatform(e.target.value)}>
            <option value="Twitch">Twitch</option>
            <option value="YouTube">YouTube</option>
            <option value="Kick">Kick</option>
            <option value="TikTok">TikTok</option>
            <option value="Rumble">Rumble</option>
        </select>
        <button className={formCSS.btn + " " + formCSS.btn_add}>add</button>
        <button className={formCSS.btn + " " + formCSS.btn_cancel} onClick={() => onCancel(false)}>cancel</button>
    </div>)
}