import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getHotels } from "../modules/destination.js";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button } from "semantic-ui-react";


const HotelsList = props => {
  const [gotHotelsData, setGotHotelsData] = useState(false);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlaces] = useState({});

  const getHotelsShowData = async () => {
    const hotelsData = await getHotels(
      props.trip)
    props.setHotels(hotelsData);
    setGotHotelsData(true)
  };


  useEffect(() => {
    if (props.gotHotels == true) {
      getHotelsShowData()
    }
  }, [props.gotHotels])

  let hotelCard;

  if (gotHotelsData == true) {
    debugger
    hotelCard = props.hotels.map(hotel => {
      return (
        <div className="centerText">
          <div id="hotel-cards" className="ui card">
            <div className="image"><img src="https://thumbnails.trvl-media.com/PUrr-BSAcHRWzkWDuOP2XTmK80I=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/600000/598500/598487/30a71d36_z.jpg" /></div>
            <div className="content">
              <div className="header">
                {hotel.name}
              </div>
              <div className="description">
                {hotel.address}
                <br />
                {hotel.url}
              </div>
            </div>
            <div className="extra content">
              <div id="price-box">
                Current deals from {hotel.price} SEK / Night
              </div>
              <Button>Add to Itinerary</Button>
            </div>
          </div>
        </div>
      );
    });
  }

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlaces(props)
    setActiveMarker(marker)
    setShowingInfoWindow(true)
  };

  return (
    <>
      <div className="ui stackable four column grid">
        {hotelCard ? (
          <div id="divider">
            <p>We found {props.hotels.length} hotels located near your activities.</p>
          </div>
        ) : null}
        {hotelCard}
      </div>
      <div id="embed-map">
        {hotelCard ? (
          <div className="hotels-map">
            <Map google={props.google}
              style={{ width: '90%', height: '60%', position: 'relative' }}
              className={'map'}
              zoom={14}
              initialCenter={{
                lat: props.hotels[0].lat,
                lng: props.hotels[0].lng
              }}>
              <Marker onClick={onMarkerClick}
                name={props.hotels[0].name}
                position={{ lat: props.hotels[0].lat, lng: props.hotels[0].lng }} />
              <Marker onClick={onMarkerClick}
                name={props.hotels[1].name}
                position={{ lat: props.hotels[1].lat, lng: props.hotels[1].lng }} />
              <Marker onClick={onMarkerClick}
                name={props.hotels[2].name}
                position={{ lat: props.hotels[2].lat, lng: props.hotels[2].lng }} />
              <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}>
                <div>
                  <h4>{selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </div>
        ) : null}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    hotels: state.hotels,
    trip: state.trip,
    gotHotels: state.gotHotels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHotels: data => {
      dispatch({ type: "SET_HOTELS", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY
  })(HotelsList)
);