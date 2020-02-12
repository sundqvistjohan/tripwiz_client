import React from "react";
import { connect } from "react-redux";
import Restaurants from "./Restaurants";
import Hotels from "./Hotels";
import Activities from "./Activities";
import Destination from "./Destination";
import { Grid, GridColumn } from "semantic-ui-react";

const Trip = props => {
  let currentView;

  switch (true) {
    case props.progression === 0 || props.progression === 1:
      currentView = <Destination />;
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
          <div id="progression-num">
            <h5>{props.progression + 1} / 6</h5>
          </div>
          {currentView}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    message: state.message,
    gotActivities: state.gotActivities,
    gotHotels: state.gotHotels,
    gotRestaurants: state.gotRestaurants,
    finalizeMessage: state.finalizeMessage,
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    },
    setFinalizeMessage: message => {
      dispatch({ type: "SET_FINALIZEMESSAGE", payload: message });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
