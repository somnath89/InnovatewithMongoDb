import React from 'react';
import logo from './logo.svg';
import './App.css';
import {NavigationBar} from './AppBar.js';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';


function App() {
  
  return (
    <Switch>
      <Route exact path='/' render={() => (<Home/>)}/>
    </Switch>

  );
}

export default App;
