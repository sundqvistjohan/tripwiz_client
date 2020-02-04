import React from 'react';
import SendDestination from './components/Destination'
import EmbedMap from "./components/EmbedMap"


const App = () => {
  return (
    <div className="App">
      TripWiz
      <SendDestination />
      <EmbedMap />
    </div>
  );
}

export default App;