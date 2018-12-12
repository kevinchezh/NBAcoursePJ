import React, {Component} from 'react';
import { connect } from 'react-redux';
class Header extends Component{
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <button className="btn btn-dark my-2 my-sm-0">
                        <a href="/auth/google">Login With Google</a>
                    </button>
                );
            default:
                return[
                <div>
                    <button className="btn btn-dark my-2 my-sm-0">
                        <a href="/fantasyTeam">Fantasy Team</a>
                    </button>
                    <button className="btn btn-dark my-2 my-sm-0">
                        <a href="/profile">My Profile</a>
                    </button>
                    <button className="btn btn-dark my-2 my-sm-0">
                        <a href="/api/logout">Logout</a>
                    </button>
                </div>
                ];
        }
    }
	render(){
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
  				<a className="navbar-brand" href="/">Database</a>
  				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
			  	</button>
  				<div className="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul className="navbar-nav mr-auto">
    					<li className="nav-item active">
    					    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
    					</li>
    					<li className="nav-item">
        					<a className="nav-link" href="/player/index">Player</a>
    				 	</li>
                        <li className="nav-item">
        					<a className="nav-link" href="/player/commonTeammates">Common Teammates</a>
    				 	</li>
						<li className="nav-item">
        					<a className="nav-link" href="/team/index">Team</a>
    				 	</li>
    				</ul>
                    {this.renderContent()}
  				</div>
			</nav>
		);
	}
}

function mapStateToProps({auth}){
    //get auth state out of all the states
    return {auth};
}

export default connect(mapStateToProps)(Header);


