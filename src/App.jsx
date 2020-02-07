import React from 'react';
import Destination from './components/Destination'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Trip from './components/Trip.jsx'

const App = () => {
  return (
      <div className="ui container">
        <BrowserRouter>
          <div className="App">
            TripWiz
            <Switch>
              <Route exact path="/" component={Destination}></Route>
              <Route exact path="/trip" component={Trip}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;