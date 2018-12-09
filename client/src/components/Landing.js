import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Landing extends Component {
	render() {
		return (
			<div className = "container">
				<h1> Welcome to NBA datasets!</h1>
				<h3>NBA datasets provides stats for all NBA players/teams since 2000, also allow
					you to build up you fantasy team!</h3>
				<Link to ='/player/index' className = 'btn btn-primary'> 
				Search Player</Link>
				<Link to ='/team/index' className = 'btn btn-primary'> 
				Search Team</Link>
			</div>
		);
	}
}

export default Landing;