import React, { useEffect } from "react";
import { connect } from "react-redux";

const RestaurantsList = props => {

  useEffect(() => {

  }, [props.restaurants]);

  let restaurantCard;

  if (props.restaurants) {
    debugger
    restaurantCard = props.restaurants.restaurant.map(restaurant => {
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

  

  return <>{restaurantCard}</>;
};

const mapStateToProps = state => {
  return {
    trip: state.trip,
    restaurants: state.restaurants
  };
};

export default connect(mapStateToProps)(RestaurantsList);
