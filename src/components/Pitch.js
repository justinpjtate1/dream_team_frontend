import React, { useState } from 'react';

const Pitch = (props) => {
    const [teamName, setTeamName] = useState("");

    const handleTeamNameInput = (e) => {
        setTeamName(e.target.value)
    }

    return(
        <>
            <h1>Pitch</h1>
            <input type="text" onChange={handleTeamNameInput}/>
            <h3>{teamName}</h3>
            <ul>List view of pitch
                <li>{props.dreamTeam.GK.player_name}</li>
                <li>{props.dreamTeam.LB.player_name}</li>
                <li>{props.dreamTeam.LCB.player_name}</li>
                <li>{props.dreamTeam.RCB.player_name}</li>
                <li>{props.dreamTeam.RB.player_name}</li>
                <li>{props.dreamTeam.LM.player_name}</li>
                <li>{props.dreamTeam.LCM.player_name}</li>
                <li>{props.dreamTeam.RCM.player_name}</li>
                <li>{props.dreamTeam.RM.player_name}</li>
                <li>{props.dreamTeam.LS.player_name}</li>
                <li>{props.dreamTeam.RS.player_name}</li>
            </ul>

            <button>Save</button>

        </>
        
    )
}

export default Pitch