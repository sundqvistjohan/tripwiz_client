import React from 'react';
import Trip from './components/Trip.jsx';
import EmbedMap from "./components/EmbedMap";
import { connect } from "react-redux";
import Result from "./components/Result.jsx"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const App = (props) => {
	
	return (
		<>
			<BrowserRouter>
				<Switch>
          <Route exact path="/" component={Trip} />
          <Route exact path="/result" component={Result} />
        </Switch>
				{props.progression === 0 && (
					<EmbedMap />
				)}
			</BrowserRouter>
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