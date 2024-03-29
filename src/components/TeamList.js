import React, { useState, Component } from 'react';
import apiUrl from '../apiConfig';
import axios from 'axios';

class TeamList extends Component {
    render() {
        return(
            <div id="list-of-teams">
            {this.props.teams.map((team, index) => <div key={index}><h4 id={`team-name`}>{team.team_name}</h4><h4>{team.email}</h4>{this.props.pageType === "view" ? <><button onClick={() => this.props.handleSelectedTeam(index)}>View</button></> : <><button onClick={() => this.props.handleSelectedTeam(index)}>Edit</button><button onClick={() => this.props.handleDelete(index)}>Delete</button></>}</div>)}
            </div>
        )
    }
}

export default TeamList