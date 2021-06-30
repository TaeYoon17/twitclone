import React,{useState} from "react";
const ProfileForm=({userObj,refreshUser})=>{
    const [name,setName]=useState(userObj.displayName);
    const onSubmit=async e=>{
        e.preventDefault();
        if(userObj.displayName!==name){
            await userObj.updateProfile({
                displayName:name
            });
            refreshUser();
        }
        setName("");
    }
    const onChange=(e)=>{
        const {target:{value}}=e;
        setName(value);
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placehlder="Enter the change name"
                onChange={onChange} value={name}/>
                <input type="submit" value="Change"/>
            </form>
        </>
    )
}

export default ProfileForm;