import { dbService } from "fbase";
import React,{useState} from "react";

const Twit=({twitObj, isOwner})=>{
    const [twit,setTwit]=useState(twitObj.text);
    const [toggle,setToggle]=useState(false);
    const onDelete=async ()=>{
        const conFirm=window.confirm("You want to Delete??");
        conFirm && await dbService.doc(`/twit/${twitObj.id}`).delete();
    }
    const onUpdate=()=>setToggle(prev=>!prev);
    const onChange=e=>setTwit(e.target.value);
    const onCancel=e=> setToggle(!toggle);
    const onSubmit=async e=>{
        e.preventDefault();
        await dbService.doc(`/twit/${twitObj.id}`).update({
            text:twit
        });
        setToggle(prev=>!prev);
    }
    return(
    <div key={twitObj.id}>
    {toggle ? 
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={twit} onChange={onChange} value={twit}/>
            <input type="submit" value="ReTwit"/>
            <button onClick={onCancel}>Cancel</button>
        </form>
        </>
        :
        <>
            <h4>{twitObj.text}</h4>
        {isOwner &&
            <>
            <button onClick={onUpdate}>Edit</button>
            <button onClick={onDelete}>Delete</button>
            </>
        }
        </>
    }
    </div>
    )
}

export default Twit;