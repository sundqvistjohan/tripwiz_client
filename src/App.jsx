import React from 'react';
import SendDestination from './components/Destination'
import EmbedMap from "./components/EmbedMap"


const App = () => {
  return (
    <div className="App">
      tripwiz
      <SendDestination />
      <EmbedMap />
    </div>
  );
}

export default App;