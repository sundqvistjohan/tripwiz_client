import React from 'react';
import Destination from './components/Destination'
import EmbedMap from "./components/EmbedMap"
import Login from "./components/Login";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      TripWiz
      <BrowserRouter>
      <Login />
      <Switch>
      </Switch>
      </BrowserRouter> 
      <Destination />
      <EmbedMap />  
    </div>

  );
}

export default App;