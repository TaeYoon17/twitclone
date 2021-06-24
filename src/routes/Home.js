import React,{useEffect, useState} from "react";
import {dbService} from "fbase";
const Home=({userObj})=>{
    const [twit,setTwit]=useState("");
    const [twits,setTwits]=useState([]);
    useEffect(()=>{
        dbService.collection("twit").onSnapshot(snapshot=>{
            const tiwtArray=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
            console.log(tiwtArray);
            setTwits(tiwtArray);
        });
    },[]);
    const onSubmit=async e=>{
        e.preventDefault();
        await dbService.collection("twit").add({
            text: twit,
            createdAt: Date.now(),
            creatorId:userObj.uid
        });
        setTwit("");
    }
    const onChange=e=>{
        const{target:{value}}=e;
        setTwit(value);
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={twit}/>
                <input type="submit" value="Post"/>
            </form>
            <div>
                {twits.map(twit=><div key={twit.id}><h4>{twit.text}</h4></div>)}
            </div>
        </>
    )
};
export default Home;