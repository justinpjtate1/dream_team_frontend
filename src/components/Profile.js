import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';
import TeamList from './TeamList';
import Pitch from './Pitch';
import '../profile.css';
import EditTeamContainer from './EditTeamContainer';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teams: [],
            selectedTeam: null,
            selectedPlayers: [],
            dreamTeam: {},
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
            const filteredTeams = response.data.filter(team => team.user_id === +(localStorage.getItem("resource_owner_id")))
            this.setState({
                teams: filteredTeams
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

    handleDelete = (index) => {
        let teamId = this.state.teams[index].id
        axios.delete(`${apiUrl}/custom_teams/delete_team`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            },
            data: {
                custom_team_id: teamId
            } 
        })
        .then((response) => {
            const teamsArrayWithoutDeletedTeam = this.state.teams.filter((team, value) => value != index)
            const playersArrayWithoutDeletedTeam = this.state.selectedPlayers.filter(player => player.id != teamId)
            this.setState({
                teams: teamsArrayWithoutDeletedTeam,
                selectedPlayers: playersArrayWithoutDeletedTeam
            })
        })
        .catch((error) => console.log(error))
    }

    render() {
        return(
            <>
            <h2>Welcome, {localStorage.getItem("resource_owner_email")}</h2>
            <h3>Your teams:</h3>
            <TeamList teams={this.state.teams}
                      handleSelectedTeam={this.handleSelectedTeam}
                      filterSelectedTeam={this.filterSelectedTeam}
                      teamId={this.state.selectedTeamId}
                      handleDelete={this.handleDelete}
                      />
            {this.state.selectedTeam != null ? <EditTeamContainer pageType="profile"
                                                                  dreamTeam={this.state.dreamTeam}
                                                                  filterSelectedTeam={this.filterSelectedTeam} 
                                                                  teamId={this.state.selectedTeamId} 
                                                                  teamName={this.state.selectedTeamName}
                                                                  /> : null}
            </>
        )
    }
}

export default Profile