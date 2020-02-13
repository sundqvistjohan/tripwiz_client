import React from 'react';
import Trip from './components/Trip.jsx';
import EmbedMap from "./components/EmbedMap";
import { connect } from "react-redux";
import Login from "./components/Login.jsx"

const App = (props) => {
	
	return (
		<>
			<Login />
			<Trip />
			{props.progression === 0 && (
				<EmbedMap />
			)}
		</>
	);
}

const mapStateToProps = state => {
	return {
		progression: state.progression
	};
};


export default connect(
	mapStateToProps)(App);