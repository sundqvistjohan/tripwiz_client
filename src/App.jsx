import React from 'react';
import Trip from './components/Trip.jsx';
import { connect } from "react-redux";
import Result from "./components/Result.jsx"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EmbedMap from "./components/EmbedMap";

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