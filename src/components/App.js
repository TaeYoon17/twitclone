import React,{useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";
const App=()=>{
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [init,setInit]=useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged(user=>{
      if(user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setInit(true);
    });
  },[]);
  console.log(authService.currentUser);
  return(<>
    {init? <AppRouter isLoggedIn={isLoggedIn}></AppRouter> :"initializing..."}
    <footer>&copy {new Date().getUTCDate()}</footer></>
    );
}

export default App;
