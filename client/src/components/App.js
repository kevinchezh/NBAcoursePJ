import React, {Component} from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import SearchResult from './SearchResult';
import PlayerIndex from './Player/PlayerIndex';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
			<div className="container">
				<Header />
				<Switch>
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