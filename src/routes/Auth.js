import React,{useState} from "react";
const Auth=()=>{
    const [form,setForm]=useState({
        email:"",
        password:""
    });
    const {email,password}=form;
    const onSubmit=(e)=>{
        e.preventDefault();
    }
    const onChange=e=>{
        const {target:{name,value}}=e;
        setForm({
            ...form,
            [name]:value
        })
    }
    return(
    <>
    <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={onChange} value={email}/>
        <input type="password" name="password" placeholder="Password" onChange={onChange}required value={password}/>
        <input type="submit"/>
    </form>
    <button>Continue with Google</button>
    <button>Continue with Google</button>
    </>
)
}
export default Auth;