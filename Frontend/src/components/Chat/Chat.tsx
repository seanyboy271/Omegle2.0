import React, { useState, useEffect, createRef } from 'react'
import Display from "./Display/Display";
import Input from "./Input/Input";
import './Chat.css'
import { useParams, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function Chat({ userName, getUserName }: { userName: string, getUserName: Function }) {

    const { roomId } = useParams()
    const [ws, setWs] = useState<WebSocket>()
    const [IDTracker, setID] = useState(-1)
    const history = useHistory()

    const handleClose = () => history.push('/')
    const handleSubmit = () => getUserName(inputRef.current?.value)
    const inputRef = createRef<HTMLInputElement>()

    useEffect(() => {
        if (roomId && IDTracker !== roomId) {
            setID(roomId)
            setWs(new WebSocket(`ws://localhost:8999/${roomId}?userName=${userName}`))
            console.log('Create web sokcet connection', ws)

            //On destroy, close server connection
            if (ws)
                return function cleanup() { ws.close() }
        }
        else if (!roomId) {
            setWs(undefined)
        }
    }, [roomId, IDTracker, ws]);


    if (userName !== '' || !roomId) {
        return (
            <div className='chat'>
                <Display ws={ws} />
                <Input ws={ws} userName={userName} />
            </div>
        )
    }
    else {
        return (
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create username</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input ref={inputRef} type='text' placeholder='Enter username' />
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="primary" type='submit' onClick={() => handleSubmit()}>
                        Join
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default Chat