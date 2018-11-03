import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import SearchResult from './SearchResult';
class App extends Component {
	render() {
		return (
			<BrowserRouter>
			<div className="container">
				<Header />
				<Route exact path="/" component={Landing} />
				<Route exact path="/SearchResult" component={SearchResult} />
			</div>
			</BrowserRouter>
		);
	}
}

export default App;