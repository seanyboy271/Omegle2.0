import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
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

function CreateRoom({ getUsername, globalUserName }: { getUsername: Function, globalUserName: string }) {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const [userName, setUserName] = useState('')
    const [error, setError] = useState()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const room: Room = (await axios.post(`${process.env.REACT_APP_API_URL}/createRoom`,
                {
                    user: {
                        userName: userName
                    }
                }
            )).data

            handleClose();
            history.push(`/${room.id}`)
            getUsername(userName)
        }
        catch (err) {
            setError(err.response.message || err.message)
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
                    {error && <Alert variant='danger' onClose={() => { setError(undefined) }} dismissible>
                        {error}
                    </Alert>
                    }
                </Modal.Header>


                <Modal.Body>
                    <form>
                        <input type='text' placeholder='Enter username' onChange={(e) => { setUserName(e.target.value) }} />
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