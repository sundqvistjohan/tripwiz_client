import React, { useState, useEffect } from "react";
import { getRestaurants } from "../modules/destination.js";
import { connect } from "react-redux";

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState(null);
  const [gotRestaurants, setGotRestaurants] = useState(false);

  const getRestaurantsData = async () => {
    let response = await getRestaurants(props.trip);
    if (response.status === 200) {
      setRestaurants(response.data["restaurant"]);
      setGotRestaurants(true);
    }
  };
  useEffect(() => {
    getRestaurantsData();
  }, []);

  let restaurantCard;

  if (gotRestaurants) {
    restaurantCard = restaurants.map(restaurant => {
      return (
        <div className="restaurant-card">
          <div id="restaurant-cards" key={restaurant.id} className="ui card">
            <div className="image">
              <img img alt="" src="https://i.pinimg.com/564x/80/75/fd/8075fd3160e87f2aff474f53c2ecbcb2.jpg" />
            </div>
            <div className="content">
              <div className="header">{restaurant.name}</div>
              <div>{restaurant.address}</div>
            </div>
            <div id="restaurant-desc" className="extra content">
              <div id="price-box">Rating: {restaurant.rating} / 5</div>
            </div>
          </div>
        </div>
      );
    });
  }

  

  return (
    <>
      <h5 id="tab-msg">Your Restaurant list</h5>
      {restaurantCard}
    </>
  );
};

const mapStateToProps = state => {
  return {
    trip: state.trip,
  };
};

export default connect(mapStateToProps)(RestaurantsList);
