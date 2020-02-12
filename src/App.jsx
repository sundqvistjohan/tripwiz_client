import React from 'react';
import Trip from './components/Trip.jsx'
import Login from "./components/Login.jsx"

const App = () => {
  return (
      <div className="ui container">
          <div className="App">
          <Login />
          <Trip />
          </div>
      </div>
  );
}

export default App;