import React from 'react';
import Trip from './components/Trip.jsx';
import EmbedMap from "./components/EmbedMap";
import { connect } from "react-redux";

const App = (props) => {
	
	return (
		<>
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

