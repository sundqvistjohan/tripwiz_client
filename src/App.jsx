import React from 'react';
import Destination from './components/Destination'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Activities from './components/Activities.jsx'

const App = () => {
  return (
      <div className="ui container">
        <BrowserRouter>
          <div className="App">
            TripWiz
            <Switch>
              <Route exact path="/" component={Destination}></Route>
              <Route exact path="/activities" component={Activities}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;