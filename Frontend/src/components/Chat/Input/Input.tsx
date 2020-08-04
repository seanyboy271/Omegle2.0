import React, { useState } from 'react';
import './Input.css'
import Button from 'react-bootstrap/Button'

function Input({ ws, userName }: { ws: WebSocket | undefined, userName:string }) {


    const inputRef = React.createRef<HTMLInputElement>()

    return (
        <div className='input'>
            <input ref={inputRef} className='messageInput' type='text' placeholder='type message here'/>
            <Button className='sendButton' onClick={(event) => {sendToServer(ws,event)}}>Send</Button>
        </div>
    )

    function sendToServer(ws: WebSocket | undefined, event:any) {
        if(inputRef.current){
            ws?.send(`${userName}: ${inputRef.current?.value}`)
            inputRef.current.value = ''
        }
    }
}


export default Input