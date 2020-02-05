import React, { useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from 'react-redux'

const EmbedMap = props => {
  const lat = props.lat
  const lng = props.lng

  const onClickHandler = e => {
    props.setLat(e.latLng.lat());
    props.setLng(e.latLng.lng());
    props.setMessage("Destination seccessfully chosen from map");
  };

  const getCurrentLocation = () => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        props.setLat(pos.coords.latitude);
        props.setLng(pos.coords.longitude);
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div id="map">
        <Map
          google={props.google}
          zoom={10}
          center={{ lat: lat, lng: lng }}
          style={{ width: "640px", height: "640px" }}
          onClick={(mapProps, map, e) => onClickHandler(e)}
        >
          <Marker position={{ lat: lat, lng: lng }} />
        </Map>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    lat: state.lat,
    lng: state.lng,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLat: lat => {
      dispatch({ type: "CHANGE_LAT", payload: lat })
    },
    setLng: lng => {
      dispatch({ type: "CHANGE_LNG", payload: lng })
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_APIKEY
})(EmbedMap));
