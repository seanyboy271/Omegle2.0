import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './Nav.css'
import CreateRoom from './CreateRoom/CreateRoom'
import JoinRoom from './JoinRoom/JoinRoom'
import LeaveRoom from './LeaveRoom/LeaveRoom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useParams } from 'react-router-dom';

function NavBar({ getUserName, userName }: { getUserName: Function, userName: string }) {

    const { roomId } = useParams()

    return (
        <Nav className='nav'>
            <div className='buttonGroup'>
                <ButtonGroup>
                    <CreateRoom getUsername={getUserName} globalUserName={userName} />
                    <JoinRoom getUsername={getUserName} globalUserName={userName} />
                    {roomId && <LeaveRoom globalUserName={userName} />}
                </ButtonGroup>
            </div>
            <div className ='roomCount'>{roomId ? `Current Room ID: ${roomId}` : `Not in room`} </div>
        </Nav>
    )
}

export default NavBar