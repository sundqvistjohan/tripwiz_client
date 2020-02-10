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
          <div className="ui card">
            <div class="image"><img src="https://thumbnails.trvl-media.com/PUrr-BSAcHRWzkWDuOP2XTmK80I=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/600000/598500/598487/30a71d36_z.jpg" /></div>
            <div className="content">
              <div class="header">{hotel.name}</div>
              <div class="description">
                {hotel.address}
                <br />
                {hotel.url}
              </div>
            </div>
            <div className="extra content">
              {hotel.price} SEK / Night
            </div>
          </div>
        );
    });
  }


  return (
    <>
      <Button id="get-hotels" onClick={getHotelsShowData}>Show Hotels</Button>
      {hotelCard}
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
