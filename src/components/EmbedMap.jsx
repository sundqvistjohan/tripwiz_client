import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const EmbedMap = props => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  const onClickHandler = e => {
    setCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const getCurrentLocation = () => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div id="location" style={{ margin: "20px" }}>
        {coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}
      </div>
      <div id="map">
        <Map
          google={props.google}
          zoom={10}
          center={{ lat: coords.lat, lng: coords.lng }}
          style={{ width: "640px", height: "640px" }}
          onClick={(mapProps, map, e) => onClickHandler(e)}
        >
          <Marker position={{ lat: coords.lat, lng: coords.lng }} />
        </Map>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY
})(EmbedMap);
