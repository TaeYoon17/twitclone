import React,{useState} from "react";
import {authService,firebaseInstance} from "fbase";
const Auth=()=>{
    const [form,setForm]=useState({
        email:"",
        password:""
    });
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");
    const {email,password}=form;
    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            let data;
            if(newAccount) data=await authService.createUserWithEmailAndPassword(email,password);
            else data=await authService.signInWithEmailAndPassword(email,password);
        }catch(error){
            console.error(error.message);
            setError(error.message);
        }
    }
    const onChange=e=>{
        const {target:{name,value}}=e;
        setForm({
            ...form,
            [name]:value
        })
    }
    const toggleAccount=()=>setNewAccount(prev=>!prev);
    const onSocialClick=async e=>{
        const name=e.target.name;
        let provider;
        if(name==="google") provider = new firebaseInstance.auth.GoogleAuthProvider();
        else if(name==="github") provider = new firebaseInstance.auth.GithubAuthProvider();
        const data=await authService.signInWithPopup(provider);
        console.log(data);
    }
    return(
    <>
    <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={onChange} value={email}/>
        <input type="password" name="password" placeholder="Password" onChange={onChange}required value={password}/>
        <input type="submit" value={newAccount ? "Register":"LogIn"}/>
    </form>
    <span onClick={toggleAccount}>{newAccount ?"LogIn" : "Register"}</span>
    <span>{error}</span>
    <br/>
    <button onClick={onSocialClick} name="google">Continue with Google</button>
    <button onClick={onSocialClick} name="github">Continue with Github</button>
    </>
)
}
export default Auth;