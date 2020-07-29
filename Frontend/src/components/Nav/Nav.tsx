import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './Nav.css'
import CreateRoom from './CreateRoom/CreateRoom'
import JoinRoom from './JoinRoom/JoinRoom'
import LeaveRoom from './LeaveRoom/LeaveRoom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useParams } from 'react-router-dom';

function NavBar({getUserName, userName}: {getUserName: Function, userName:string}) {

    const { roomId } = useParams()

    return (
        <Nav className='nav'>
            <ButtonGroup>
                <CreateRoom getUsername={getUserName} />
                <JoinRoom getUsername={getUserName} />
                {roomId && <LeaveRoom userName={userName} />}
            </ButtonGroup>
        </Nav>
    )
}

export default NavBar