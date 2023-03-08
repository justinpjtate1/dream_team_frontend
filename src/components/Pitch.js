import React, { useState } from 'react';

const Pitch = (props) => {
    

    

    return(
        <>
            <h1>Pitch</h1>
            <input type="text" onChange={(e) => props.handleTeamNameInput(e)}/>
            <h3>{props.teamName}</h3>
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

            <button onClick={() => props.handleSave()}>Save</button>

        </>
        
    )
}

export default Pitch