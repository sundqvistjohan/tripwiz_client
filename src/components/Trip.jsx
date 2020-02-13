import React from "react";
import { connect } from "react-redux";
import Restaurants from "./Restaurants";
import Hotels from "./Hotels";
import Activities from "./Activities";
import Destination from "./Destination";
import Result from "./Result"

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
    case props.progression === 6:
      currentView = <Result />;
      break;
    default:
      currentView = <Destination />;
  }

  return (
    <>
      {props.progression + 1} / 6
      {currentView}
    </>
  );
};

const mapStateToProps = state => {
  return {
    progression: state.progression
  };
};

export default connect(mapStateToProps)(Trip);
