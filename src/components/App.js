import React,{useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  console.log(authService.currentUser);
  return(<>
    <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
    <footer>&copy {new Date().getUTCDate()}</footer></>
    );
}

export default App;
