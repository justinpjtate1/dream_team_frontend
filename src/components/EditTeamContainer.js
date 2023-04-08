import React, { Component } from 'react';
import axios from 'axios';
import apiUrl from '../apiConfig';
import PlayerSearch from './PlayerSearch';
import Pitch from './Pitch';

class EditTeamContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playersToShow: [],
            playerFilterInput: "",
            clubFilterInput: "",
            position: "",
            teamId: null,
            playerSelected: {},
            teamName: "",
            dreamTeam: {
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
                RS: {}
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.teamId !== state.teamId && props.pageType === "profile") {
            return {
                dreamTeam: props.dreamTeam,
                teamName: props.teamName,
                teamId: props.teamId
            };
        } else {
            return null;
        }
    }

    handleAddPlayer = () => {
        const player = this.state.playersToShow[this.state.playerSelected]
        const newDreamTeamObject = this.state.dreamTeam
        newDreamTeamObject[this.state.position] = player
        this.setState({
            dreamTeam: newDreamTeamObject,
            position: "",
            playerSelected: ""
        })
    }

    handleTeamNameInput = (e) => {
        this.setState({
            teamName: e.target.value
        })
    }

    handlePlayerInput = (e) => {
        this.setState({
            playerFilterInput: e.target.value
        })
    }

    handleClubInput = (e) => {
        this.setState({
            clubFilterInput: e.target.value
        })
    }

    handlePlayerFilter = () => {
        axios.get(`${apiUrl}/players/player_search?name=${this.state.playerFilterInput}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => {
            this.setState({
                playersToShow: [response.data]
            })
        })
    }
    
    handleClubFilter = () => {
        axios.get(`${apiUrl}/players/club_search?name=${this.state.clubFilterInput}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
            }
        })
        .then((response) => {
            this.setState({
                playersToShow: response.data
            })
        }) 
    }

    handleSave = () => {
        const returnArrayToPost = (teamId) => {
            let arrayToPost = []
                Object.entries(this.state.dreamTeam).map(player => {
                    arrayToPost.push(
                        {
                            custom_team_id: teamId,
                            player_id: player[1].id,
                            position: player[0]
                        }
                    )
                })
            return arrayToPost
        }
        if(this.props.pageType === "profile") {
            axios.patch(`${apiUrl}/custom_teams/update_team`, {
                custom_team_id: this.state.teamId,
                custom_team_name: this.state.teamName
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                }
            })
            .then((response) => {
                axios.post(`${apiUrl}/custom_teams/update_team_players`, {
                    players: returnArrayToPost(this.state.teamId)
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                    }
                })
            })
        } else {
            axios.post(`${apiUrl}/custom_teams/new_team`, {
                team_name: this.state.teamName,
                user_id: localStorage.getItem('resource_owner_id') 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                }
            })
            .then((response) => {
                axios.post(`${apiUrl}/custom_teams/save_players`, {
                    players: returnArrayToPost(response.data.id)
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                    }
                })
            })
        }
            
    }

    onRadioButtonChange = (e) => {
        this.setState({
            position: e.target.value
        })
    }

    handlePlayerSelected = (index) => {
        this.setState({
            playerSelected: index
        })
    }

    render() {
        return(
            <>
            <Pitch dreamTeam={this.state.dreamTeam}
                   handleSave={this.handleSave}
                   handleTeamNameInput={this.handleTeamNameInput}
                   teamName={this.state.teamName}
                   />
            <button onClick={this.handleSave}>Save</button>
            <PlayerSearch handlePlayerFilter={this.handlePlayerFilter}
                          handleClubFilter={this.handleClubFilter}
                          handleAddPlayer={this.handleAddPlayer}
                          handleClubInput={this.handleClubInput}
                          handlePlayerInput={this.handlePlayerInput}
                          playersToShow={this.state.playersToShow}
                          onRadioButtonChange={this.onRadioButtonChange}
                          handlePlayerSelected={this.handlePlayerSelected}
                          />
        </>
        )
    }
}

// const EditTeamContainer = (props) => {
//     const [playersToShow, setPlayersToShow] = useState([]);
//     const [playerFilterInput, setPlayerFilterInput] = useState("");
//     const [clubFilterInput, setClubFilterInput] = useState("");
//     const [position, setPosition] = useState("")
//     const [playerSelected, setPlayerSelected] = useState({})
//     const [teamName, setTeamName] = useState(() => {
//         if(props.teamName) {
//             return props.teamName
//         } else {
//             return ""
//         }
//     });
//     // const [dreamTeam, setDreamTeam] = useState(props.dreamTeam != null ? props.dreamTeam : {
//     //     GK: {},
//     //     LB: {},
//     //     LCB: {},
//     //     RCB: {},
//     //     RB: {},
//     //     LM: {},
//     //     LCM: {},
//     //     RCM: {},
//     //     RM: {},
//     //     LS: {},
//     //     RS: {},
//     // })
//     const [dreamTeam, setDreamTeam] = useState(props.dreamTeam)

//     const handleAddPlayer = () => {
//         const player = playersToShow[playerSelected]
//         const newDreamTeamObject = dreamTeam
//         newDreamTeamObject[position] = player
//         setDreamTeam(newDreamTeamObject)
//         setPosition("")
//         setPlayerSelected("")
//     }

//     const handleTeamNameInput = (e) => {
//         setTeamName(e.target.value)
//     }

//     const handlePlayerInput = (e) => {
//         setPlayerFilterInput(e.target.value)
//     }

//     const handleClubInput = (e) => {
//         setClubFilterInput(e.target.value)
//     }

//     const handlePlayerFilter = () => {
//         axios.get(`${apiUrl}/players/player_search?name=${playerFilterInput}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//             }
//         })
//         .then((response) => setPlayersToShow([response.data]))
//     }
    
//     const handleClubFilter = () => {
//         axios.get(`${apiUrl}/players/club_search?name=${clubFilterInput}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//             }
//         })
//         .then((response) => setPlayersToShow(response.data)) 
//     }

//     const handleSave = () => {
//         const returnArrayToPost = (teamId) => {
//             let arrayToPost = []
//                 Object.entries(this.state.dreamTeam).map(player => {
//                     arrayToPost.push(
//                         {
//                             custom_team_id: teamId,
//                             player_id: player[1].id,
//                             position: player[0]
//                         }
//                     )
//                 })
//             return arrayToPost
//         }
//         if(props.pageType === "profile") {
//             axios.patch(`${apiUrl}/custom_teams/update_team`, {
//                 custom_team_id: props.teamId,
//                 custom_team_name: this.state.teamName
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//                 }
//             })
//             .then((response) => {
//                 axios.post(`${apiUrl}/custom_teams/update_team_players`, {
//                     players: returnArrayToPost(props.teamId)
//                 }, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//                     }
//                 })
//             })
//         } else {
//             axios.post(`${apiUrl}/custom_teams/new_team`, {
//                 team_name: this.state.teamName,
//                 user_id: localStorage.getItem('resource_owner_id') 
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//                 }
//             })
//             .then((response) => {
//                 axios.post(`${apiUrl}/custom_teams/save_players`, {
//                     players: returnArrayToPost(response.data.id)
//                 }, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
//                     }
//                 })
//             })
//         }
            
//     }

//     const onRadioButtonChange = (e) => {
//         setPosition(e.target.value)
//     }

//     const handlePlayerSelected = (index) => {
//         setPlayerSelected(index)
//     }

//     return(
//         <>
//             <Pitch dreamTeam={props.pageType === "profile" ? props.dreamTeam : dreamTeam}
//                    handleSave={handleSave}
//                    handleTeamNameInput={handleTeamNameInput}
//                    teamName={props.teamName}
//                    />
//             <button onClick={handleSave}>Save</button>
//             <PlayerSearch handlePlayerFilter={handlePlayerFilter}
//                           handleClubFilter={handleClubFilter}
//                           handleAddPlayer={handleAddPlayer}
//                           handleClubInput={handleClubInput}
//                           handlePlayerInput={handlePlayerInput}
//                           playersToShow={playersToShow}
//                           onRadioButtonChange={onRadioButtonChange}
//                           handlePlayerSelected={handlePlayerSelected}
//                           />
//         </>
//     )
// }

export default EditTeamContainer