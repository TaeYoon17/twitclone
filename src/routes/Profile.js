import React, {  useEffect,useState } from "react";
import { authService,dbService } from "fbase";
import { useHistory } from "react-router-dom";
import ProfileForm from "components/ProfileForm";
import TwitList from "components/TwitList";
const Profile=({userObj,refreshUser})=>{
    const [myTwits,setMyTwits]=useState([]);
    const history=useHistory();
    const onLogOutClick=()=>{
        authService.signOut();
        history.push("/");
    };
    useEffect(()=>{
        dbService
        .collection("twit")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .onSnapshot(snapshot=>{
            const tiwtArray=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
            setMyTwits(tiwtArray);
        });
    },[userObj.uid]);
    return(
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        <ProfileForm userObj={userObj} refreshUser={refreshUser}/>
        <TwitList userObj={userObj} twits={myTwits}/>
        </>
    )
};
export default Profile;