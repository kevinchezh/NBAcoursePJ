import React, {Component} from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import SearchResult from './SearchResult';
import PlayerIndex from './Player/PlayerIndex';
import TrivialDetail from './Trivial/TrivialDetail';
import TrivialCard from './Trivial/TrivialCard';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
			<div className="container">
				<Header />
				<Route path = "/" component = {TrivialCard} />
				<Switch>
					<Route path = "/trivial/detail" component = {TrivialDetail} />
					<Route path = "/player/index" component={PlayerIndex} />
					<Route exact path="/" component={Landing} />
					<Route exact path="/SearchResult" component={SearchResult} />
				</Switch>
				
			</div>
			</BrowserRouter>
		);
	}
}

export default App;