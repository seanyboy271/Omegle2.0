import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './Nav.css'
import CreateRoom from './CreateRoom/CreateRoom'
import JoinRoom from './JoinRoom/JoinRoom'
import LeaveRoom from './LeaveRoom/LeaveRoom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useParams } from 'react-router-dom';
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'

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
            {roomId ?
                <div className='roomCount'>
                    Current Room ID: {roomId}
                    <div className='share'>
                        <EmailShareButton subject={`${userName} wants you to join their chat room!`} url={window.location.href} >
                            <EmailIcon size='32' round />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={window.location.href}
                        >
                            <FacebookIcon size='32' round />
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={window.location.href}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                    </div >
                </div> : `Not in room`}
        </Nav>
    )
}

export default NavBar