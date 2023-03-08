import React, { useState } from 'react';
import apiUrl from '../apiConfig';
import Pitch from './Pitch';
import PlayerListItem from './PlayerListItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PlayerList = (props) => {
    const [playersToShow, setPlayersToShow] = useState([]);
    const [playerFilterInput, setPlayerFilterInput] = useState("");
    const [clubFilterInput, setClubFilterInput] = useState("");
    const [position, setPosition] = useState("")
    const [playerSelected, setPlayerSelected] = useState({})
    const [teamName, setTeamName] = useState("");
    const [dreamTeam, setDreamTeam] = useState({
        GK: {},
        LB: {},
        LCB: {},
        RCB: {},
        RB: {},
        LM: {},
        LCM: {},
        RCM: {},
        RM: {},
        LS: {},
        RS: {},
    })

    const handlePlayerInput = (e) => {
        setPlayerFilterInput(e.target.value)
    }

    const handleClubInput = (e) => {
        setClubFilterInput(e.target.value)
    }

    const handlePlayerFilter = () => {
        axios.get(`${apiUrl}/players/player_search?name=${playerFilterInput}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => setPlayersToShow([response.data]))
    }

    const handleClubFilter = () => {
        axios.get(`${apiUrl}/players/club_search?name=${clubFilterInput}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => setPlayersToShow(response.data)) 
    }

    const onRadioButtonChange = (e) => {
        setPosition(e.target.value)
    }

    const handlePlayerSelected = (index) => {
        setPlayerSelected(index)
    }

    const handleAddPlayer = () => {
        const player = playersToShow[playerSelected]
        const newDreamTeamObject = dreamTeam
        newDreamTeamObject[position] = player
        setDreamTeam(newDreamTeamObject)
        setPosition("")
        setPlayerSelected("")
    }

    const handleTeamNameInput = (e) => {
        setTeamName(e.target.value)
    }

    const handleSave = () => {
        axios.post(`${apiUrl}/custom_teams/new_team`, {
            team_name: teamName,
            user_id: localStorage.getItem('resource_owner_id') 
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => {
            let arrayToPost = []
            Object.entries(dreamTeam).map(player => {
                arrayToPost.push(
                    {
                        custom_team_id: response.data.id,
                        player_id: player[1].id,
                        position: player[0]
                    }
                )
            })
            axios.post(`${apiUrl}/custom_teams/save_players`, {
                players: arrayToPost
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                }
            })
        })
    }

    return(
        <>
            <Pitch dreamTeam={dreamTeam}
                   handleSave={handleSave}
                   handleTeamNameInput={handleTeamNameInput}
                   teamName={teamName}
                    />
            <h1>Player List</h1>
            <input type="text" placeholder="Player Name" onChange={handlePlayerInput}></input>
            <button onClick={handlePlayerFilter}>Filter</button>
            <input type="text" placeholder="Club" onChange={handleClubInput}></input>
            <button onClick={handleClubFilter}>Filter</button>
            <div>
                {playersToShow.map((player, index) => <PlayerListItem playerName={player.player_name}
                                                                      clubName={player.club_name} 
                                                                      key={index} index={index} 
                                                                      handleAddPlayer={handleAddPlayer} 
                                                                      onRadioButtonChange={onRadioButtonChange}
                                                                      handlePlayerSelected={handlePlayerSelected}
                                                                    />)}
            </div>
        </>
        
    )
}

export default PlayerList