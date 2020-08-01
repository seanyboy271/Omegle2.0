import React, { useState, createRef } from 'react'
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
    const [error, setError] = useState()
    const inputRef = createRef<HTMLInputElement>()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const room: Room = (await axios.post(`${process.env.REACT_APP_API_URL}/createRoom`,
                {
                    user: {
                        userName: inputRef.current?.value
                    }
                }
            )).data

            console.log('createroom usename val', inputRef.current?.value)
            getUsername(inputRef.current?.value)
            handleClose();
            history.push(`/${room.id}`)
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
                    <input ref={inputRef} type='text' placeholder='Enter username'/>
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