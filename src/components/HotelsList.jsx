import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getHotels } from "../modules/destination.js";

const HotelsList = props => {
  const [gotHotelsData, setGotHotelsData] = useState(false);

  const getHotelsShowData = async () => {
    const hotelsData = await getHotels(
      props.trip)
    props.setHotels(hotelsData);
    setGotHotelsData(true)
  };

  let hotelCard;

  if (gotHotelsData == true) {
    hotelCard = props.hotels.results.map(hotel => {
      return (
        <div className="centerText">
          <div id="hotel-cards" className="ui card">
            <div className="image"><img src="https://thumbnails.trvl-media.com/PUrr-BSAcHRWzkWDuOP2XTmK80I=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/600000/598500/598487/30a71d36_z.jpg" /></div>
            <div className="content">
              <div className="header">{hotel.name}</div>
              <div className="description">
                {hotel.address}
                <br />
                {hotel.url}
              </div>
            </div>
            <div className="extra content">
              We found deals from {hotel.price} SEK / Night
              </div>
          </div>
        </div>
        );
    });
  }


return (
  <>
    <Button id="get-hotels" onClick={getHotelsShowData}>Show Hotels</Button>
    <div className="ui stackable four column grid">
      {hotelCard}
    </div>
  </>
)
}

const mapStateToProps = state => {
  return {
    hotels: state.hotels,
    trip: state.trip
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
)(HotelsList);
