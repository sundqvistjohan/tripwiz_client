import React, { useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from "react-redux";

const EmbedMap = props => {
  const lat = props.lat;
  const lng = props.lng;

  const onClickHandler = e => {
    props.setLat(e.latLng.lat());
    props.setLng(e.latLng.lng());
    props.updateProgression(props.progression + 1);
    props.setMessage("Destination successfully chosen from map");
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
      <div className="map-section" id="embed-map">
        <Map
          google={props.google}
          zoom={5}
          style={{ width: '100%', height: '100%', position: 'relative' }}
          center={{ lat: lat, lng: lng }} 
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
    message: state.message,
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLat: lat => {
      dispatch({ type: "CHANGE_LAT", payload: lat });
    },
    setLng: lng => {
      dispatch({ type: "CHANGE_LNG", payload: lng });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY
  })(EmbedMap)
);
