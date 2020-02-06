import React from 'react';
import Destination from './components/Destination'
import EmbedMap from "./components/EmbedMap"


const App = () => {
  return (
    <div className="App">
      TripWiz
      <Destination />
      <EmbedMap />
    </div>
  );
}

export default App;