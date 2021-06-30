import React from "react";
import Twit from "components/Twit";
const TwitList=({twits,userObj})=>{
    console.log(twits);
    return(
        <div>
            {twits.map(twit=>
            <Twit
                key={twit.createdAt}
                twitObj={twit}
                isOwner={twit.creatorId===userObj.uid}
                userObj={userObj}
            />)}
        </div>
    )
}

export default TwitList;