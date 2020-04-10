import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const HighScore = () => {
  const [highScoreData, setHighScoreData] = useState(null);

  const getHighScore = async () => {
    let response = await getHighScoreData(props.trip);
    if (response.status === 200 && response.data === null) {
      setHighScoreData(false);
    } else {
      setHighScoreData(response.data);
    }
  };

  useEffect(() => {
    getHighScore();
  }, []);

  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    progression: state.progression,
    currentUser: state.currentUser,
    authenticated: state.authenticated,
    currentRoute: state.currentRoute,
    logout: state.logout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAuth: (auth) => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    updateProgression: (value) => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setCurrentRoute: (route) => {
      dispatch({ type: "SET_CURRENROUTE", payload: route });
    },
    setLogout: (value) => {
      dispatch({ type: "SET_LOGOUT", payload: value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScore);
