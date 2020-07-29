import React from 'react';
import './App.css';
import NavBar from '../Nav/Nav'
import Chat from '../Chat/Chat'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";



function App() {

  return (
    <Router>
      <NavBar />
      <Route path={['/:roomId', '']} >
        <Chat />
      </Route>
    </Router>
  );
}

export default App;
