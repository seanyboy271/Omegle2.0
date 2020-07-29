import './Display.css'
import React, { useEffect, useState } from 'react'
import  MessageDisplayer  from "./MessageDisplayer/MessageDisplayer";

function Display({ ws }: { ws: WebSocket | undefined}) {

    const [message, setMessage] = useState("")

    useEffect(() => {
        if (ws){
            ws.onmessage = (event) => {
                setMessage(`${message}\n${event.data}`)
            }
        }
        else{
            setMessage('')
        }
    })

    return (
        <div className='display'>
            <MessageDisplayer message={message}/>
        </div>
    )
}

export default Display