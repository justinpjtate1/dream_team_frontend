import React, { Component, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiConfig';
import PlayerListItem from './PlayerListItem';

const PlayerSearch = (props) => {

        return(
            <div id="search-container">
                <h1>Player List</h1>
                <input type="text" placeholder="Player Name" onChange={(e) => props.handlePlayerInput(e)}></input>
                <button onClick={() => props.handlePlayerFilter()}>Filter</button>
                <input type="text" placeholder="Club" onChange={(e) => props.handleClubInput(e)}></input>
                <button onClick={() => props.handleClubFilter()}>Filter</button>
                <div>
                    {props.playersToShow.map((player, index) => <PlayerListItem playerName={player.player_name}
                                                                                clubName={player.club_name} 
                                                                                key={index}
                                                                                index={index}
                                                                                onRadioButtonChange={(e) => props.onRadioButtonChange(e)}
                                                                                handlePlayerSelected={(index) => props.handlePlayerSelected(index)}
                                                                                handleAddPlayer={() => props.handleAddPlayer()}
                                                                                />)}
                                                                                
                </div>
            </div>
        )
}

export default PlayerSearch