import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { BsX } from 'react-icons/bs'
import './JoinRoom.css'

export interface Room {
    wss: any;
    users: User[]
    id: string
    maxUsers: number
}

export interface User {
    username: string
}

function JoinRoom({ getUsername, globalUserName }: { getUsername: Function, globalUserName: string }) {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState<String>()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            axios.post(`${process.env.REACT_APP_API_URL}/joinRoom/${roomId}`,
                {
                    user: {
                        username: userName
                    }
                }
            )

            handleClose();
            history.push(`/${roomId}`)
            if (userName !== '')
                getUsername(userName)
        }
        catch (err) {
            setError(`Error ${err.response.status}: ${err.response.data}`)
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
                    {error && <Alert variant='danger' onClose={() => {setError(undefined)}} dismissible>
                        {error}
                    </Alert>
                    }

                </Modal.Header>


                <Modal.Body>
                    <input type='text' placeholder='Enter username' onChange={(e) => { setUserName(e.target.value) }} />
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