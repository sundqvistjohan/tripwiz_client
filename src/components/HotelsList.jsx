import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getHotels } from "../modules/destination.js";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button } from "semantic-ui-react";
import { chooseHotel } from "../modules/destination";

const HotelsList = props => {
  const [gotHotelsData, setGotHotelsData] = useState(false);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlaces] = useState({});
  const [hotelMessage, setHotelMessage] = useState("");

  const getHotelsShowData = async () => {
    const hotelsData = await getHotels(
      props.trip)
    props.setHotels(hotelsData);
    setGotHotelsData(true)
  };

  const selectHotel = (hotelId, hotelName) => {
    debugger
    let response = chooseHotel(props.trip, hotelId);
    if (response.status == 200) {
      setHotelMessage(`Thanks for selecting ${hotelName}`)
    } else {
      setHotelMessage("Oops, Something went wrong")
    }
  }


  useEffect(() => {
    if (props.gotHotels == true) {
      getHotelsShowData()
    }
  }, [props.gotHotels])

  let hotelCard;

  if (gotHotelsData == true) {
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
              <Button onClick={() => selectHotel(hotel.id, hotel.name) }>Add to Itinerary</Button>
            </div>
          </div>
        </div>
      );
    });
  }

  let markers;
  
  if (gotHotelsData == true) {
    const onMarkerClick = (props, marker, e) => {
      setSelectedPlaces(props)
      setActiveMarker(marker)
      setShowingInfoWindow(true)
    };
    markers = props.hotels.map(marker => {
      return (
        <Marker onClick={onMarkerClick}
          name={marker.name}
          position={{ lat: marker.lat, lng: marker.lng }} />
      )
    })
  }
  
  return (
    <>
      <div className="ui stackable four column grid">
        {hotelCard ? (
          <div id="divider">
            We have found {props.hotels.length} hotels near your activities
            <p>{hotelMessage}</p>
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
              zoom={15}
              initialCenter={{
                lat: props.hotels[0].lat,
                lng: props.hotels[0].lng
              }}>
              {markers}
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