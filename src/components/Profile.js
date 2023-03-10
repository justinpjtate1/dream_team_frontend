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
import ViewDreamTeamPage from './ViewDreamTeamPage';
import '../profile.css';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageType: "profile"
        }
    }
    render() {
        return(
            <>
            <h2>Welcome, {localStorage.getItem("resource_owner_email")}</h2>
            <h3>Your teams:</h3>
            <ViewDreamTeamPage pageType={this.state.pageType}/>
            </>
        )
    }
}

// class Profile extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             existingTeams: [],
//             selectedTeamId: null,
//             selectedTeamName: null,
//             pageType: "view"
//         }
//     }

//     componentDidMount() {
//         axios.post(`${apiUrl}/custom_teams/show_teams_from_user`, {
//             id: localStorage.getItem("resource_owner_id")
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//             }
//         })
//         .then((response) => {
//             this.setState({
//                 existingTeams: response.data
//             })
//         })
//         .catch((error) => console.log(error))
//     }

//     getTeamDetails = (e) => {
//         this.setState({
//             selectedTeamId: +(e.target.value),
//             selectedTeamName: e.target.id
//         }, () => {
//             let teamId = this.state.selectedTeamId
//             axios.post(`${apiUrl}/custom_teams/show_players`, {
//                 custom_team_id: teamId
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//                 }
//             })
//             .then((response) => {
//                 const filterResponse = (positionKey, valueKey) => {
//                     return response.data.filter((player) => player.position === positionKey)[0][valueKey]
//                 }
//                 const playerObject = (key) => {
//                     return {
//                         club_name: filterResponse(key, "club_name"),
//                         dob: filterResponse(key, "dob"),
//                         id: filterResponse(key, "player_id"),
//                         player_name: filterResponse(key, "player_name")
//                     }
//                 }
//                 let teamObject = {
//                     GK: playerObject("GK"),
//                     LB: playerObject("LB"),
//                     LCB: playerObject("LCB"),
//                     RCB: playerObject("RCB"),
//                     RB: playerObject("RB"),
//                     LM: playerObject("LM"),
//                     LCM: playerObject("LCM"),
//                     RCM: playerObject("RCM"),
//                     RM: playerObject("RM"),
//                     LS: playerObject("LS"),
//                     RS: playerObject("RS")
//                 }
//                 this.setState({
//                     selectedTeamObject: teamObject
//                 })
//             })
//             .catch((error) => console.log(error))
//         })
//     }

//     render() {
//         return(
//             <div>
//                 {this.state.existingTeams.length > 0? this.state.existingTeams.map(team => <div key={team.id}><h3>{team.team_name}</h3><p>{team.email}</p><button value={team.id} id={team.team_name} onClick={this.getTeamDetails}>Update Team</button></div>) : null}
//                 {this.state.selectedTeamId !== null ? <CreateDreamTeamPage dreamTeam={this.state.selectedTeamObject} pageType={this.state.pageType} teamName={this.state.selectedTeamName} /> : null}
//             </div>
//         )
//     }
// }

// const Profile = (props) => {

//     return(
//         <>
//             <h1>Logged in: Profile</h1>
//             <Link to="/update">Update</Link>
//         </>
        
//     )
// }

export default Profile