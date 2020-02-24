import React from 'react';
import { connect } from "react-redux";

const Header = (props) => {

  let loggedIn;
  switch (true) {
    case props.authenticated:
      loggedIn = <h5>Logged in as {props.current_user.name}</h5>
      break;
    case !props.authenticated && localStorage.getItem("J-sunkAuth-Storage") !== null:
      loggedIn = <h5>Logged in with <span style={{color: '#4267b2'}}>Facebook</span></h5>
      break;
  }

  return (
    <>
      <header className="ui fixed inverted menu">
        <div className="inner">
          <a href="/"><h5 className="masthead-brand">
            <span style={{ color: 'rgb(82, 80, 80)' }}>
              TripWIZ
            </span>
          </h5></a>
        </div>
        <div className="right menu">
          {loggedIn}
        </div>
      </header>
    </>
  )
}

const mapStateToProps = state => {
  return {
    current_user: state.current_user,
    authenticated: state.authenticated
  };
};

export default connect(
  mapStateToProps)(Header);