import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './Nav.css'
import CreateRoom from './CreateRoom/CreateRoom'
import JoinRoom from './JoinRoom/JoinRoom'

function NavBar() {

    return (
        <Nav>
            <CreateRoom />
            <JoinRoom />
        </Nav>
    )
}

export default NavBar