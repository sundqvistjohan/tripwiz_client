import React from "react";
import { connect } from "react-redux";
import { FacebookProvider, Login } from "react-facebook";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";

const FacebookLogin = props => {

  if (localStorage.getItem("J-sunkAuth-Storage")) {
    let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"))
    if (headers['access-token'] === "test") {
      props.updateProgression(props.progression + 1);
    }
  }

  const handleResponse = async data => {
    const response = await axios.post("/auth", {
      uid: data.profile.id,
      email: data.profile.email,
      provider: "facebook"
    });
    if (response.status === 200) {
      props.changeAuth(true);
      setSession(response.data, response.headers);
      props.updateProgression(props.progression + 1);
    }
  };

  const setSession = (data, headers) => {
    const storageKey = "J-sunkAuth-Storage";
    const session = {
      ["access-token"]: data["auth_token"],
      ["cache-control"]: headers["cache-control"],
      client: data["client_id"],
      ["content-type"]: headers["content-type"],
      ["token-type"]: "Bearer",
      expiry: data["expiry"],
      uid: data["uid"]
    };
    localStorage.setItem(storageKey, JSON.stringify(session));
  };

  return (
    <div className="center-screen">
      <h2 style={{ paddingBottom: "40px" }}>In order to get started...</h2>
      <FacebookProvider appId="175176387099386">
        <Login scope="email" onCompleted={handleResponse}>
          {({ loading, handleClick, data }) => (
            <Button id="login-button" size="massive" color="facebook" onClick={handleClick}>
              <Icon name="facebook" />
              {!loading && `Login with Facebook`}
              {loading && `Loading...`}
            </Button>
          )}
        </Login>
      </FacebookProvider>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
