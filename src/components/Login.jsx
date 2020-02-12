import React from "react";
import auth from "../modules/auth";
import { connect } from "react-redux";
import { Link , Redirect} from "react-router-dom";
import { Button } from 'semantic-ui-react'

const Login = props => {
  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        props.changeAuth(true);
        props.setUserAttrs(userDatas.data);
        props.changeAuthMessage(`Logged in as: ${userDatas.data.email}`);
      })
      .catch(error => {
        props.changeAuthMessage(error.response.data.errors);
      });
  };
  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.changeAuth(false);
        props.changeLoginButton(true);
        props.changeSignupButton(true);
        props.changeAuthMessage("");
      })
      .catch(error => {
        props.changeAuthMessage(error);
      });
  };
  
  let loginFunction;
  switch (true) {
    case props.displayLoginButton &&
      !props.authenticated &&
      props.displaySignupButton:
      console.log("entered 0")
      loginFunction = ( 
        <Button
          id="login-button" to="/login"
          onClick={() => props.changeLoginButton(false)}
        >
          Login
        </Button>
      );
      break;
    case !props.displayLoginButton && !props.authenticated:
      console.log("entered 1")
      loginFunction = (
        <>
          <p>Login</p>
          <form id="login-form" onSubmit={onLogin}>
            <label>email </label>
            <input name="email" type="email" id="email"></input>
            <label>password</label>
            <input name="password" type="password" id="password"></input>&nbsp;
            <button id="submit">Submit</button>
          </form>
          {props.authMessage}
        </>
      );
      break;
    case props.authenticated:
      console.log("entered 2")
      loginFunction = (
        <>
          <span>{props.authMessage}</span>&nbsp;
          <br/>
          <Button id="logout-link" to="/" onClick={onLogout}>
            Logout
          </Button>
        </>
      );
      break;
    default:
      loginFunction = null;
  }
  return (
    <div id="login">{loginFunction}</div>
  );
};
  const mapStateToProps = state => ({
    authenticated: state.authenticated,
    userAttrs: state.userAttrs,
    authMessage: state.authMessage,
    displaySignupButton: state.displaySignupButton,
    displayLoginButton: state.displayLoginButton
  });
  const mapDispatchToProps = dispatch => {
    return {
      changeAuth: auth => {
        dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
      },
      changeAuthMessage: message => {
        dispatch({ type: "CHANGE_AUTHMESSAGE", payload: message });
      },
      changeLoginButton: value => {
        dispatch({ type: "CHANGE_LOGINBUTTON", payload: value });
      },
      changeSignupButton: value => {
        dispatch({ type: "CHANGE_SIGNUPBUTTON", payload: value });
      },
      setUserAttrs: userAttrs => {
        dispatch({ type: "CHANGE_USER_ATTRIBUTES", payload: userAttrs });
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Login);