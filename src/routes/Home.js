import React,{useEffect, useState} from "react";
import TwitList from "components/TwitList";
import {dbService} from "fbase";
import TwitFactory from "components/TwitFactory";
const Home=({userObj})=>{
    const [twits,setTwits]=useState([]);
    useEffect(()=>{
        dbService.collection("twit")
        .onSnapshot(snapshot=>{
            const tiwtArray=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
            setTwits(tiwtArray);
        });
    },[]);
    return(
        <>
            <div>
                <TwitFactory userObj={userObj}/>
            </div>
            <div>
                <TwitList userObj={userObj} twits={twits}/>
            </div>
        </>
    )
};
export default Home;
