import React,{useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";
const App=()=>{
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [init,setInit]=useState(false);
  const [userObj,setUserObj]=useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged(user=>{
      if(user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile(args){
            return user.updateProfile(args)
          },
        });
      }
      else setIsLoggedIn(false);
      setInit(true);
    });
  },[]);
  const refreshUser=()=>{
    const user=authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile(args){
        return user.updateProfile(args)
      },
    });
  }
  return(
  <>
    {init? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}></AppRouter> :"initializing..."}
    <footer>&copy {new Date().getUTCDate()}</footer>
  </>
    );
}

export default App;
