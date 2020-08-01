import React from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function LeaveRoom({globalUserName}: {globalUserName:string}) {

    const history = useHistory()

    return (
        <Button variant='danger' onClick={() => { handleClick() }}> Leave Room</Button>
    )

    async function handleClick() {
        //Send leave room request

        axios.post(`${process.env.REACT_APP_API_URL}/leaveRoom`,
            {
                user: {
                    username: globalUserName
                }
            }
        )

        history.push('/')

    }

}