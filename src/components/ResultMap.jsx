import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";

const ResultMap = props => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState({});

  let activityTypes;
  let marker
  let activityMarkers = [];

  useEffect(() => {}, [props.activities]);

  const onMarkerClick = (props, marker) => {
    setSelectedPlaces(props)
    setActiveMarker(marker)
    setShowInfoWindow(true)
  };

  if (props.activities) {
    activityTypes = Object.keys(props.activities);

    activityTypes.map(activityType => {
      marker = props.activities[activityType].map((activity, index) => {
        return (
          <Marker
            key={activity.id}
            name={activity.name}
            activityType={activityType.replace('_', ' ')}
            onClick={onMarkerClick}
            position={{ lat: activity.lat, lng: activity.lng }}
            icon={{
              url: `/mapIcons/${activityType}.png`,
              scaledSize: new props.google.maps.Size(40, 40)
            }}
          />
        );
      });
      activityMarkers.push(marker)
    });
  }

  return (
    <>
      <div id="result-map">
        <Map
          google={props.google}
          zoom={12}
          initialCenter={{ lat: props.lat, lng: props.lng }}
          style={{ width: "75%", height: "60%", position: "relative" }}
        >
          {activityMarkers}
          <InfoWindow
                marker={activeMarker}
                visible={showInfoWindow}>
                <div>
                  <h4 style={{padding: "0"}}>{selectedPlaces.name}</h4>
                  <i>{selectedPlaces.activityType}</i>
                </div>
              </InfoWindow>
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