import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import GameList from './gamelist';
import { router } from './gamelist/router';

function App() {
  return (
    <Router>
      <Switch>
        {
          router.map(item => (
            <Route path={item.link} key={item.title}>
              {item.component}
            </Route>
          ))
        }
        <Route exact path="/">
          <GameList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
