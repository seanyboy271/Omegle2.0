import React, { useState } from 'react';
import './Input.css'
import Button from 'react-bootstrap/Button'

function Input({ ws, userName }: { ws: WebSocket | undefined, userName:string }) {

    const [message, setMessage] = useState("")

    const inputRef = React.createRef<HTMLInputElement>()

    return (
        <div className='input'>
            <input ref={inputRef} className='messageInput' type='text' placeholder='type message here'  onChange={(e) => {
                setMessage(e.target.value);
            }} />
            <Button className='sendButton' onClick={(event) => {sendToServer(ws, message,event)}}>Send</Button>
        </div>
    )

    function sendToServer(ws: WebSocket | undefined, message: string, event:any) {
        if(inputRef.current)
            inputRef.current.value = ''
        ws?.send(`${userName}: ${message}`)
    }
}


export default Input