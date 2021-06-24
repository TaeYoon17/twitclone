import React,{useEffect, useState} from "react";
import {dbService} from "fbase";
const Home=()=>{
    const [twit,setTwit]=useState("");
    const [twits,setTwits]=useState([]);
    const getTwits=async()=>{
        const dbTwits=await dbService.collection("twit").get();
        dbTwits.forEach(document=>{   
        const twitObj={
            ...document.data(),
            id:document.id
        }
            setTwits(prev=>[twitObj,...prev]);
        });
    }
    useEffect(()=>{
        getTwits();
    },[]);
    const onSubmit=async (e)=>{
        e.preventDefault();
        await dbService.collection("twit").add({
            twit,
            createdAt: Date.now()
        });
        setTwit("");
    }
    const onChange=e=>{
        const{target:{value}}=e;
        setTwit(value);
    }
    console.log(twits);
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={twit}/>
                <input type="submit" value="Post"/>
            </form>
            <div>
                {twits.map(twit=><div key={twit.id}><h4>{twit.twit}</h4></div>)}
            </div>
        </>
    )
};
export default Home;