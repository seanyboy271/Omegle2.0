import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export interface Room {
    wss: any;
    users: User[]
    id: string
    maxUsers: number
}

export interface User {
    username: string
}

function JoinRoom({getUsername}: {getUsername: Function}) {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')

    console.log("Join room username", userName)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            axios.post(`http://localhost:8999/joinRoom/${roomId}`,
                {
                    user: {
                        username: userName
                    }
                }
            )

            handleClose();
            history.push(`/${roomId}`)
            getUsername(userName)
        }
        catch (err) {
            console.error(err)
            //throw new Error("Error occured while creating room")
        }

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Join Room
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Room</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <input type='text' placeholder='Enter username' onChange={(e) => {setUserName(e.target.value)}}/>
                    <input type='text' placeholder='Enter room ID' onChange={(e) => setRoomId(e.target.value)} />
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={(event) => handleSubmit(event)}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default JoinRoom