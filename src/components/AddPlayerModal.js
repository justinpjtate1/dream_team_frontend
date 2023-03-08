import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiUrl from './../apiConfig';

const AddPlayerModal = (props) => {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState("")

    const handleClose = () => {
        setShow(false);
    }

    const handleOpen = () => {
        setShow(true);
    }

    return(
        <>
        <button onClick={handleOpen}>
            Open Player
        </button>

        <Modal className='modal' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className='modal-header'>
                <Modal.Title>Player</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                Select Position:
                <div id="radio-buttons">
                    <input type="radio" name="position" value="GK" id="GK" onChange={e => props.onRadioButtonChange(e)}></input>
                    <label>GK</label>
                    <input type="radio" name="position" value="LB" id="LB" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>LB</label>
                    <input type="radio" name="position" value="LCB" id="LCB" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>LCB</label>
                    <input type="radio" name="position" value="RCB" id="RCB" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>RCB</label>
                    <input type="radio" name="position" value="RB" id="RB" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>RB</label>
                    <input type="radio" name="position" value="LM" id="LM" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>LM</label>
                    <input type="radio" name="position" value="LCM" id="CM" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>CM</label>
                    <input type="radio" name="position" value="RCM" id="RCM" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>CM</label>
                    <input type="radio" name="position" value="RM" id="RM" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>RM</label>
                    <input type="radio" name="position" value="LS" id="LS" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>LS</label>
                    <input type="radio" name="position" value="RS" id="RS" onChange={(e) => props.onRadioButtonChange(e)}></input>
                    <label>RS</label>
                </div>

            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <button onClick={() => props.handlePlayerSelected(props.index)}>Confirm Position</button>
                <button onClick={() => props.handleAddPlayer()}>Add Player To Team</button>
                <button onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddPlayerModal