import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiConfig';
import Pitch from './Pitch';
import PlayerList from './PlayerList';

class ViewDreamTeamPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            existingTeams: [],
            selectedTeamId: null,
            selectedTeamName: null,
            updatePage: false,
            pageType: "view",
            selectedTeamObject: {
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
            }
        }
    }

    componentDidMount() {
        axios.get(`${apiUrl}/custom_teams/show_teams`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => {
            if(this.props.pageType) {
                let usersTeams = response.data.filter(team => team.user_id === +(localStorage.getItem("resource_owner_id")))
                this.setState({
                    existingTeams: usersTeams
                })
            } else {
                this.setState({
                    existingTeams: response.data
                })
            }
        })
        .catch((error) => console.log(error))
    }

    getTeamDetails = (e) => {
        this.setState({
            selectedTeamId: +(e.target.value),
            selectedTeamName: e.target.className
        }, () => {
            axios.post(`${apiUrl}/custom_teams/show_players`, {
                custom_team_id: this.state.selectedTeamId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                }
            })
            .then((response) => {
                const filterResponse = (positionKey, valueKey) => {
                    return response.data.filter((player) => player.position === positionKey)[0][valueKey]
                }
                const playerObject = (key) => {
                    return {
                        club_name: filterResponse(key, "club_name"),
                        dob: filterResponse(key, "dob"),
                        id: filterResponse(key, "player_id"),
                        player_name: filterResponse(key, "player_name")
                    }
                }
                let teamObject = {
                    GK: playerObject("GK"),
                    LB: playerObject("LB"),
                    LCB: playerObject("LCB"),
                    RCB: playerObject("RCB"),
                    RB: playerObject("RB"),
                    LM: playerObject("LM"),
                    LCM: playerObject("LCM"),
                    RCM: playerObject("RCM"),
                    RM: playerObject("RM"),
                    LS: playerObject("LS"),
                    RS: playerObject("RS")
                }
                this.setState({
                    selectedTeamObject: teamObject
                })
            })
            .then((response) => {
                this.setState({
                    updatePage: true
                })
            })
            .catch((error) => console.log(error))
        })
    }

    deleteTeam = (e) => {
        this.setState({
            selectedTeamId: +(e.target.value),
            selectedTeamName: e.target.className
        }, () => {
            // console.log(this.state.selectedTeamId)
            axios.delete(`${apiUrl}/custom_teams/delete_team`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                },
                data: {
                    custom_team_id: this.state.selectedTeamId
                }
            })
            .then((response) => {
                let newTeams = this.state.existingTeams.filter(team => team.id !== this.state.selectedTeamId)
                this.setState({
                    existingTeams: newTeams
                })
            })
        })
    }

    render() {
        return(
            <div>
                {this.props.pageType ? <div>{this.state.existingTeams.length > 0? this.state.existingTeams.map(team => <div key={team.id}><h3>{team.team_name}</h3><p>{team.email}</p><button value={team.id} className={team.team_name} onClick={this.getTeamDetails}>Update Team</button><button value={team.id} className={team.team_name} onClick={this.deleteTeam}>Delete Team</button></div>) : null}
                {this.state.updatePage === true ? <PlayerList dreamTeam={this.state.selectedTeamObject} pageType={this.props.pageType} teamName={this.state.selectedTeamName} teamId={this.state.selectedTeamId}/> : null}</div> : <div>{this.state.existingTeams.length > 0? this.state.existingTeams.map(team => <div key={team.id}><h3>{team.team_name}</h3><p>{team.email}</p><button value={team.id} id={team.team_name} onClick={this.getTeamDetails}>Show Team</button></div>) : null}
                {this.state.selectedTeamId !== null ? <Pitch dreamTeam={this.state.selectedTeamObject} pageType={this.state.pageType} teamName={this.state.selectedTeamName} /> : null}</div>}
            </div>
        )
    }
}

export default ViewDreamTeamPage