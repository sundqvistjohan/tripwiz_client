import React, { useState } from "react";
import { connect } from "react-redux";
import Restaurants from "./Restaurants";
import Hotels from "./Hotels";
import Activities from "./Activities";
import Destination from "./Destination";
import FacebookLogin from "./FacebookLogin";
import { getTrips } from "../modules/destination"
import { Redirect } from "react-router-dom"

const Trip = props => {
  const [redirect, setRedirect] = useState(false);
  let currentView;

  const getTripsData = async () => {
    let response = await getTrips();
    if (response.status === 200) {
      if (response.data.length > 0) {
        setRedirect(true)
      } else {
        currentView = <Destination />;
      }
    }
  };

  switch (true) {
    case props.progression === -1:
      currentView = <FacebookLogin />;
      break;
    case props.progression === 0 || props.progression === 1:
       getTripsData();
      break;
    case props.progression === 2 || props.progression === 3:
      currentView = <Activities />;
      break;
    case props.progression === 4:
      currentView = <Hotels />;
      break;
    case props.progression === 5:
      currentView = <Restaurants />;
      break;
    default:
      currentView = <Destination />;
  }

  return (
    <>
      <div className="trip-section">
        <div id="main" className="centered">
          {props.progression > -1 && (
            <div id="progression-num">
              <h5>{props.progression + 1} / 6</h5>
            </div>
          )}
          {currentView}
          {redirect && <Redirect to="/result" />}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    progression: state.progression
  };
};

export default connect(mapStateToProps)(Trip);
