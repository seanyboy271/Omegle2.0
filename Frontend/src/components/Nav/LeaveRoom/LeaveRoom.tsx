import React from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function LeaveRoom({userName}: {userName:string}) {

    const history = useHistory()

    return (
        <Button onClick={() => { handleClick() }}> Leave Room</Button>
    )

    async function handleClick() {
        //Send leave room request

        axios.post('http://localhost:8999/leaveRoom',
            {
                user: {
                    username: userName
                }
            }
        )

        history.push('/')

    }

}