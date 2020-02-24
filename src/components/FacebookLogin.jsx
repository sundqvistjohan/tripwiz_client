import React, { useState } from "react";
import { connect } from "react-redux";
import { FacebookProvider, Login } from "react-facebook";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";

const FacebookLogin = props => {
  const [redirect, setRedirect] = useState(false);

  if (localStorage.getItem("J-sunkAuth-Storage")) {
    props.updateProgression(props.progression + 1)
  }

  if (localStorage.getItem("J-sunkAuth-Storage")) {
    let headers = JSON.parse(localStorage.getItem("J-sunkAuth-Storage"));
    if (headers["access-token"] === "test") {
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
      props.setCurrentUser(data.profile)
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
    <>
    <div className="center-screen">
      {redirect === true && <Redirect to="/" />}
      <h2 style={{ paddingBottom: "40px" }}>To create a trip:</h2>
      <FacebookProvider appId="175176387099386">
        <Login scope="email" onCompleted={handleResponse}>
          {({ loading, handleClick, data }) => (
            <Button
              id="login-button"
              size="massive"
              color="facebook"
              onClick={handleClick}
            >
              <Icon name="facebook" />
              {!loading && `Login with Facebook`}
              {loading && `Loading...`}
            </Button>
          )}
        </Login>
      </FacebookProvider>
    </div>
      <Button
      id="return-button"
      size="large"
      color="grey"
      onClick={() => setRedirect(true)}
    > Return
</Button>
</>
  );
};

const mapStateToProps = state => {
  return {
    progression: state.progression,
    current_user: state.current_user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setCurrentUser: data => {
      dispatch({ type: "SET_CURRENTUSER", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
