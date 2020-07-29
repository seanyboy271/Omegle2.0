import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { useHistory} from 'react-router-dom';

export interface Room {
    wss: any;
    users: User[]
    id: string
    maxUsers: number
}

export interface User {
    username: string
}

function CreateRoom({getUsername}: {getUsername: Function}) {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const [userName, setUserName] = useState('')


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const room: Room = (await axios.post('http://localhost:8999/createRoom',
                {
                    user: {
                        userName: userName
                    }
                }
            )).data

            handleClose();
            console.log('room', room)
            history.push(`/${room.id}`)
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
                Create Room
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <form>
                        <input type='text' placeholder='Enter username' onChange={(e) => {setUserName(e.target.value)} }/>
                    </form>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={(event) => handleSubmit(event)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateRoom