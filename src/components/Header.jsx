import React from 'react';
import { connect } from "react-redux";

const Header = (props) => {
  debugger
  return (
    <>
      <header className="ui fixed inverted menu">
        <div className="inner">
          <a href="/"><h5 className="masthead-brand">TripWIZ</h5></a>
        </div>
        <div className="right menu">
          {props.authenticated === true && (
          <h5>Logged in as {props.current_user.name}</h5> 
          )}
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