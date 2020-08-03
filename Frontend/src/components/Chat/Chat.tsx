import React, { useState, useEffect, createRef } from 'react'
import Display from "./Display/Display";
import Input from "./Input/Input";
import './Chat.css'
import { useParams, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';


function Chat({ userName, getUserName }: { userName: string, getUserName: Function }) {

    const { roomId } = useParams()
    const [ws, setWs] = useState<WebSocket>()
    const [IDTracker, setID] = useState(-1)
    const history = useHistory()

    const handleClose = () => history.push('/')
    const handleSubmit = () => { getUserName(inputRef.current?.value) }
    const inputRef = createRef<HTMLInputElement>()

    useEffect(() => {
        if (roomId && IDTracker !== roomId && userName) {
            setID(roomId)

            //Make sure user has been added to room on backend. If they use the join room button, this should be done. If they join from url, they need to be added
            setWs(new WebSocket(`ws://localhost:8999/${roomId}?userName=${userName}`))
            const userRoom = Axios.post(`${process.env.REACT_APP_API_URL}/getRoomByUser`, {
                user: { username: userName }
            }).then(({ data }) => {
                if (!data) {
                    Axios.post(`${process.env.REACT_APP_API_URL}/joinRoom/${roomId}`,
                        {
                            user: {
                                username: userName
                            }
                        }
                    )
                }
            }).catch((err) => {
                console.error(err)
            })

            //On destroy, close server connection
            if (ws)
                return function cleanup() { ws.close() }
        }
        else if (!roomId && ws) {
            //close connection
            console.log("closing connection")
            ws?.close(1000, userName);
            setWs(undefined)
        }
    }, [roomId, IDTracker, ws, userName]);


    if (userName || !roomId) {
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