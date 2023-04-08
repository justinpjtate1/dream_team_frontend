import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiConfig';
import TeamList from './TeamList';
import Pitch from './Pitch';
import PlayerSearch from './PlayerList';
import '../view.css';

class ViewDreamTeamPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teams: [],
            selectedTeam: null,
            selectedPlayers: [],
            dreamTeam: {},
            pageType: "view",
            selectedTeamId: null,
            selectedTeamName: null
        }
    }

    componentDidMount() {
        this.showListOfTeams()
        this.getAllCustomTeamsAndSelectedPlayers()
    }

    handleSelectedTeam = (index) => {
        this.setState({
            selectedTeam: index
        }, this.filterSelectedTeam(index))
    }

    filterSelectedTeam = (index) => {
        let teamId = this.state.teams[index].id
        let filteredPlayersArray = this.state.selectedPlayers.filter(player => player.custom_team_id === teamId)
        let dreamTeamObject = {}
        filteredPlayersArray.map(player => dreamTeamObject[player.position] = {club_name: player.club_name, dob: player.dob, id: player.player_id, player_name: player.player_name})
        this.setState({
            dreamTeam: dreamTeamObject,
            selectedTeamId: teamId,
            selectedTeamName: this.state.teams[index].team_name
        })
    }

    showListOfTeams = () => {
        axios.get(`${apiUrl}/custom_teams/show_teams`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => {
            this.setState({
                teams: response.data
            })
        })
        .catch((error) => console.log(error))
      }
    
    getAllCustomTeamsAndSelectedPlayers = () => {
        axios.get(`${apiUrl}/custom_teams/show_teams_players`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
        }
        })
        .then((response) => {
            this.setState({
                selectedPlayers: response.data
            })
        })
        .catch((error) => console.log(error))
      }

    render() {
        return(
            <div id="view-team-container">
                <h1>See all teams:</h1>
                <div className="page-container">
                    <TeamList teams={this.state.teams} handleSelectedTeam={this.handleSelectedTeam} filterSelectedTeam={this.filterSelectedTeam} pageType={this.state.pageType} />
                    {this.state.selectedTeam != null ? <><Pitch dreamTeam={this.state.dreamTeam} pageType={this.state.pageType} teamId={this.state.selectedTeamId} teamName={this.state.selectedTeamName}/></> : null} 
                </div>
            </div>
        )
    }
}

export default ViewDreamTeamPage