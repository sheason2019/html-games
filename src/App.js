import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Cells from './cells';

function App() {
  return (
    <Router>
      <Switch>
        <Router path="/">
          <Cells />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
