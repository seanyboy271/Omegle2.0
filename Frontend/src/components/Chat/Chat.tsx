import React, { useState, useEffect } from 'react'
import Display from "./Display/Display";
import Input from "./Input/Input";
import './Chat.css'
import { useParams } from 'react-router-dom';


function Chat() {

    const { roomId } = useParams()
    const [ws, setWs] = useState<WebSocket>()
    const [IDTracker, setID] = useState(-1)

    useEffect(() => {
        if (roomId && IDTracker !== roomId) {
            setID(roomId)
            setWs(new WebSocket(`ws://localhost:8999/${roomId}`))
            console.log('Create web sokcet connection', ws)

            //On destroy, close server connection
            if (ws)
                return function cleanup() { ws.close() }
        }
    }, [roomId, IDTracker, ws]);

    return (
        <div className='chat'>
            <Display ws={ws}/>
            <Input ws={ws} />
        </div>
    )
}


export default Chat