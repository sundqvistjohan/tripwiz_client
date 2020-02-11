import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";

const ResultMap = props => {
  useEffect(() => {}, [props.activities]);
  let markers = []

  if (props.activities && props.activities.length > 0) {
    markers = props.activities.map((activity, index) => {
      return (
        <Marker
          label={index}
          position={{ lat: activity.lat, lng: activity.lng }}
        />
      );
    });
  }

  return (
    <>
      <div id="result-map">
        <Map
          google={props.google}
          zoom={12}
          center={{ lat: props.lat, lng: props.lng }}
        >
          {markers}
        </Map>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    trip: state.trip,
    lat: state.lat,
    lng: state.lng,
    activities: state.activities
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY
  })(ResultMap)
);
