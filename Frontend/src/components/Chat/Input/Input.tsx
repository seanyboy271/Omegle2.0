import React, { useState } from 'react';
import './Input.css'
import Button from 'react-bootstrap/Button'

function Input({ ws }: { ws: WebSocket | undefined }) {

    const [message, setMessage] = useState("")

    return (
        <div>
            <input type='text' placeholder='type message here'  onChange={(e) => {
                setMessage(e.target.value);
            }} />
            <Button onClick={(event) => {sendToServer(ws, message)}}>Send</Button>
        </div>
    )
}


function sendToServer(ws: WebSocket | undefined, message: string) {
    ws?.send(message)
}


export default Input