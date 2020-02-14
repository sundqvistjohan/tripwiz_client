import React from "react";
import { connect } from "react-redux";
import { FacebookProvider, LoginButton } from "react-facebook";
import axios from "axios";

const FacebookLogin = props => {
  
  const handleResponse = async data => {
    const response = await axios.post("/auth", {
      uid: data.profile.id,
      email: data.profile.email,
      provider: "facebook"
    });
    if (response.status === 200) {
      props.changeAuth(true);
    }
  };

  return (
    <FacebookProvider appId="175176387099386">
      <LoginButton scope="email" onCompleted={handleResponse}>
        <span>Login with the Facebox</span>
      </LoginButton>
    </FacebookProvider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    }
  };
};

export default connect(null, mapDispatchToProps)(FacebookLogin)
