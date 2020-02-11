import React from "react";
import Destination from "./components/Destination";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Trip from "./components/Trip.jsx";
import Result from "./components/Result";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Destination}></Route>
            <Route exact path="/trip" component={Trip}></Route>
            <Route exact path="/result" component={Result}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
