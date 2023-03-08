import React, { useState } from 'react';
import AddPlayerModal from './AddPlayerModal';

const PlayerListItem = (props) => {
    return(
        <div>
            <h3>{props.playerName}</h3>
            <p>{props.clubName}</p>
            <AddPlayerModal onRadioButtonChange={(e) => props.onRadioButtonChange(e)} 
                            handlePlayerSelected={(index) => props.handlePlayerSelected(index)}
                            handleAddPlayer={() => props.handleAddPlayer()} 
                            index={props.index}/>
        </div>
    )
}

export default PlayerListItem