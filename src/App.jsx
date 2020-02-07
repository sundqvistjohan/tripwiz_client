import React from 'react';
import Destination from './components/Destination'
import EmbedMap from "./components/EmbedMap"
import Login from "./components/Login";
import Signup from "./components/Signup"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      TripWiz
      <BrowserRouter>
      <Link to="/login">Login</Link>
      <Switch>
      <Route exact path="/login" component={Login} />
      </Switch>
      </BrowserRouter> 
      <Destination />
      <EmbedMap />  
    </div>

  );
}

export default App;