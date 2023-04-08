import React, { useEffect, useState } from 'react';
import EditTeamContainer from './EditTeamContainer';
import '../create.css'
import axios from 'axios';
import apiUrl from '../apiConfig';

const CreateDreamTeamPage = (props) => {

    return(
        <>
            <h1>Create Dream Team</h1>
            <EditTeamContainer />
            
        </>
        
    )
}

export default CreateDreamTeamPage