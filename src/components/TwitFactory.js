import React,{useState} from "react";
import {dbService, storageService} from "fbase";
import {v4 as uuidv4} from "uuid"; 
const TwitFactory=({userObj, twitObj})=>{
    const [twit,setTwit]=useState("");
    const [attatchment,setAttatchment]=useState(null);
    const onSubmit=async e=>{
        e.preventDefault();
        let attatchmentURL=null;
        if(attatchment===null && twit==="") return;
        else{
            if(attatchment!==null){
                const fileRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                const response=await fileRef.putString(attatchment,"data_url");
                attatchmentURL=await response.ref.getDownloadURL();
            }
            const nTwit={
                text: twit,
                createdAt: Date.now(),
                creatorId:userObj.uid,
                attatchmentURL
            }
            if(twitObj===null) await dbService.doc(`/twit/${twitObj.id}`).update({
                text:twit,
                attatchmentURL
            });
            else await dbService.collection("twit").add(nTwit);
            setTwit("");
            setAttatchment(null);
        }
    }
    const onChange=e=>{
        const{target:{value}}=e;
        setTwit(value);
    }
    const onFileChange=e=>{
        const {target:{files}}=e;
        const theFile=files[0];
        if(theFile===undefined) setAttatchment(null);
        else{
            const reader=new FileReader();
            reader.onload=finishedE=>{
                const {currentTarget:{result}}=finishedE;
                setAttatchment(result);
            };
            reader.readAsDataURL(theFile);
        }
    }
    const onClearPhoto=()=>{
        setAttatchment(null);
    }
    return(
    <form onSubmit={onSubmit}>
    <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={twit}/>
    <input type="file" accept="image/*" onChange={onFileChange}/>
    <input type="submit" value="Post"/>
    {attatchment!==null&&
        <div>
            <img alt="Img" src={attatchment} width="50px" height="50px"/>
            <button onClick={onClearPhoto}>Cancel</button>
        </div>
    }
    </form>
    )
}

export default TwitFactory;