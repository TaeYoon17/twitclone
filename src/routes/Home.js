import React,{useState} from "react";
import {dbService} from "fbase";
const Home=()=>{
    const [twit,setTwit]=useState("");
    const onSubmit=(e)=>{
        e.preventDefault();
        dbService.collection("twit").add({
            twit,
            createdAt: Date.now()
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
        </>
    )
};
export default Home;