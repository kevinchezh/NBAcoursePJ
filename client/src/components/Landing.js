import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../Styles/landing.css';
class Landing extends Component {
	render() {
		return (
			<div className = 'jumboContainer'>
				<div className="jumbotron">
					<h1 className="display-4">Welcome to NBA datasets!</h1>
					<h3 className="lead">NBA datasets provides stats for all NBA players/teams since 2000, also allow you to build up you fantasy team!</h3>
					<hr className="my-4" />
					<Link to ='/player/index' className = 'btn btn-primary jumboButton1'> 
					Search Player</Link>
					<Link to ='/team/index' className = 'btn btn-primary jumboButton2'> 
					Search Team</Link>
				</div>
			</div>	
		)
	}
}

export default Landing;