import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import axios from 'axios';
import apiUrl from '../apiConfig';

const CreateDreamTeamPage = (props) => {
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/players`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => setPlayerList(response.data))
    })

    return(
        <>
            <h1>Create Dream Team</h1>
            <PlayerList />
            
        </>
        
    )
}

export default CreateDreamTeamPage