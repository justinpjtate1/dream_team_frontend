import React, { useState } from 'react';
import playerKit from '../player-kit.png';
import keeperKit from '../keeper-kit.png'

const Pitch = (props) => {

    return(
        <div id="full-pitch-container">
            {props.pageType !== "view" ? <input type="text" placeholder="Team Name"onChange={(e) => props.handleTeamNameInput(e)}/> : null}
            <h3>{props.teamName}</h3>
            <div id="pitch">
                <div id="GK-line" className="player-line">
                    <div id="GK-items" className='player-object'>
                        <img className="keeper-kit-image" src={keeperKit}></img>
                        <p className="player-name">{props.dreamTeam.GK.player_name}</p>
                        <p className="club-name">{props.dreamTeam.GK.club_name}</p>
                    </div>
                </div>
                <div id="def-line" className="player-line">
                    <div id="LB-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.LB.player_name}</p>
                        <p className="club-name">{props.dreamTeam.LB.club_name}</p>
                    </div>
                    <div id="LCB-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.LCB.player_name}</p>
                        <p className="club-name">{props.dreamTeam.LCB.club_name}</p>
                    </div>
                    <div id="RCB-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.RCB.player_name}</p>
                        <p className="club-name">{props.dreamTeam.RCB.club_name}</p>
                    </div>
                    <div id="RB-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.RB.player_name}</p>
                        <p className="club-name">{props.dreamTeam.RB.club_name}</p>
                    </div>
                </div>
                <div id="mid-line" className="player-line">
                    <div id="LM-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.LM.player_name}</p>
                        <p className="club-name">{props.dreamTeam.LM.club_name}</p>
                    </div>
                    <div id="LCM-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.LCM.player_name}</p>
                        <p className="club-name">{props.dreamTeam.LCM.club_name}</p>
                    </div>
                    <div id="RCM-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.RCM.player_name}</p>
                        <p className="club-name">{props.dreamTeam.RCM.club_name}</p>
                    </div>
                    <div id="RM-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.RM.player_name}</p>
                        <p className="club-name">{props.dreamTeam.RM.club_name}</p>
                    </div>
                </div>
                <div id="att-line" className="player-line">
                    <div id="LS-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.LS.player_name}</p>
                        <p className="club-name">{props.dreamTeam.LS.club_name}</p>
                    </div>
                    <div id="RS-items" className='player-object'>
                        <img className="player-kit-image" src={playerKit}></img>
                        <p className="player-name">{props.dreamTeam.RS.player_name}</p>
                        <p className="club-name">{props.dreamTeam.RS.club_name}</p>
                    </div>
                </div>
            </div>
            {props.pageType !== "view" ? <button onClick={() => props.handleSave()}>Save</button> : null}

        </div>
        
    )
}

export default Pitch