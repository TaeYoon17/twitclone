import { dbService, storageService } from "fbase";
import React,{useState} from "react";
import {v4 as uuidv4} from "uuid"; 
const Twit=({twitObj, isOwner,userObj})=>{
    const [twit,setTwit]=useState(twitObj.text);
    const [toggle,setToggle]=useState(false);
    const [newImg,setNewImg]=useState(null);
    const onDelete=async ()=>{
        const conFirm=window.confirm("You want to Delete??");
        conFirm && await dbService.doc(`/twit/${twitObj.id}`).delete();
        conFirm && twitObj.attatchmentURL &&
        await storageService.refFromURL(twitObj.attatchmentURL).delete();
    }
    const onUpdate=()=>setToggle(prev=>!prev);
    const onChange=e=>setTwit(e.target.value);
    const onCancel=()=> setToggle(!toggle);
    const onSubmit=async e=>{
        e.preventDefault();
        let attatchmentURL=null;
        if(newImg!==null){
            const fileRef= twitObj.attatchmentURL===null ? storageService.ref().child(`${userObj.uid}/${uuidv4()}`) :
            storageService.refFromURL(twitObj.attatchmentURL);
            const response=await fileRef.putString(newImg,"data_url");
            attatchmentURL=await response.ref.getDownloadURL();
        }else{
            twitObj.attatchmentURL && await storageService.refFromURL(twitObj.attatchmentURL).delete();
        }
        await dbService.doc(`/twit/${twitObj.id}`).update({
            text:twit,
            attatchmentURL
        });
        setToggle(prev=>!prev);
    }
    const onFileChange=e=>{
        const {target:{files}}=e;
        const theFile=files[0];
        if(theFile===undefined) setNewImg(null);
        else{
            const reader=new FileReader();
            reader.onload=finishedE=>{
                const {currentTarget:{result}}=finishedE;
                setNewImg(result);
            };
            reader.readAsDataURL(theFile);
        }
    }
    const onClearPhoto=()=>setNewImg(null);
    return(
    <div key={twitObj.id}>
    {toggle ? 
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={twit} onChange={onChange} value={twit}/>
            <input type="file" accept="image/*" onChange={onFileChange}/>
            {newImg!==null&&    
                    <div>
                        <img alt="Img" src={newImg} width="50px" height="50px"/>
                        <button onClick={onClearPhoto}>ClearPhoto</button>
                    </div>
            }
            <input type="submit" value="ReTwit"/>
            <button onClick={onCancel}>Cancel</button>

        </form>
        </>
        :
        <>
            <h4>{twitObj.text}</h4>
            {twitObj.attatchmentURL && <img alt="twitObj"src={twitObj.attatchmentURL} width="50px" height="50px"/>}
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