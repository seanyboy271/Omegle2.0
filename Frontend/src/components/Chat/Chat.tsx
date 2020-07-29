import React, { useState, useEffect } from 'react'
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
    const [tempUserName, setTempUserName] = useState('')

    const handleClose = () => history.push('/')
    const handleSubmit = () => getUserName(tempUserName)

    useEffect(() => {
        if (roomId && IDTracker !== roomId) {
            setID(roomId)
            setWs(new WebSocket(`ws://localhost:8999/${roomId}`))
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
                    <input type='text' placeholder='Enter username' onChange={(e) => { setTempUserName(e.target.value) }} />
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