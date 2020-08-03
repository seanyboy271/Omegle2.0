import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from '../Nav/Nav'
import Chat from '../Chat/Chat'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import axios from 'axios'




function App() {

  const cachedUserName = sessionStorage.getItem('userName') || ''
  const [userName, setUserName] = useState(cachedUserName)

  const getUserName = (userName: string) => {
    console.log("Chanigna app state username to", userName)
    setUserName(userName)
    sessionStorage.setItem('userName', userName)
  }


  useEffect(() => {
    //Leave the room when you close the window
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      ev.returnValue = ''
      axios.post(`${process.env.REACT_APP_API_URL}/leaveRoom`,
        {
          user: {
            username: userName
          }
        }
      )
    });

  })



  return (
    <Router>
      <Route path={['/:roomId', '']} >
        <NavBar getUserName={getUserName} userName={userName} />
        <Chat userName={userName} getUserName={getUserName} />
      </Route>
    </Router>
  );
}

export default App;
