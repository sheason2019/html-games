import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Cells from './cells';
import Header from './layout/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Router path="/">
          <Cells />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
