import React from "react";

const Twit=({twitObj, isOwner})=>{
    return(
    <div key={twitObj.id}>
        <h4>{twitObj.text}</h4>
        {isOwner &&
        <>
        <button>Edit</button>
        <button>Delete</button>
        </>
        }
    </div>
    )
}

export default Twit;