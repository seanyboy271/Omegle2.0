import React, { useState } from 'react';
import './App.css';
import NavBar from '../Nav/Nav'
import Chat from '../Chat/Chat'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";



function App() {

  const cachedUserName = localStorage.getItem('userName') || ''
  const [userName, setUserName] = useState(cachedUserName)

  const getUserName = (userName: string) => {
    console.log("Chanigna app state username to", userName)
    setUserName(userName)
    localStorage.setItem('userName', userName)
  }

  return (
    <Router>
      <Route path={['/:roomId', '']} >
        <NavBar getUserName={getUserName} />
        <Chat userName={userName} getUserName={getUserName}/>
      </Route>
    </Router>
  );
}

export default App;
