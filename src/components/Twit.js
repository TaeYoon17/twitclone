import { dbService } from "fbase";
import React from "react";

const Twit=({twitObj, isOwner})=>{
    const onDelete=()=>{
        const conFirm=window.confirm("You want to Delete??");
        if(conFirm)
            dbService.doc(`/twit/${twitObj.id}`).delete();
    }
    return(
    <div key={twitObj.id}>
        <h4>{twitObj.text}</h4>
        {isOwner &&
        <>
        <button>Edit</button>
        <button onClick={onDelete}>Delete</button>
        </>
        }
    </div>
    )
}

export default Twit;