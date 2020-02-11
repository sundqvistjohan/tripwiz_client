import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";

const ResultMap = props => {

  return (
    <>
      <div id="result-map">
        <Map
          google={props.google}
          zoom={12}
          center={{ lat: props.lat, lng: props.lng }}
        >
        </Map>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY
  })(ResultMap)
);
