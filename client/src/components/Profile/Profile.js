import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm';
import * as actions from '../../actions';
import PlayerDetail from '../Player/PlayerDetail';
import TeamDetail from '../Team/TeamDetail';
class Profile extends Component {
	state = {showDetail: false,
			showTeamDetail:false};
	renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <p>you need to login</p>;
            default:
                return(
                <div>
                	<h3>your favorite player is <strong>
                		<a href = "#" onClick = {()=>{
									// console.log(this.props.auth.favoritePlayer);
									this.setState({showDetail: true});
									this.setState({showTeamDetail: false});
                                    this.props.fetchPlayerDetail(this.props.auth.favoritePlayer);
                                    // this.props.fetchPlayerDetail(element.PLAYER);
                                }}> {this.props.auth.favoritePlayer} </a>
                		</strong>
                	</h3>
                	<h3>your favorite team is <strong>
                		<a href="#" onClick = {()=>{
									// console.log(this.props.auth.favoritePlayer);
									this.setState({showDetail: false});
									this.setState({showTeamDetail: true});
                                    this.props.fetchTeamDetail(this.props.auth.favoriteTeam);
                                    // this.props.fetchPlayerDetail(element.PLAYER);
                                }}>{this.props.auth.favoriteTeam}</a>
                		</strong>
                	</h3>
                	<p>Do you want to edit your favorite player and team?</p>
                    <ProfileForm />
                </div>
                );
        }
    }
	render() {
		if(this.state.showDetail) {
            return (
				<div>
					<div>
						{this.renderContent()}
					</div>
					<div>
					<button className = 'btn btn-outline-secondary' onClick = {()=>
						this.setState({ showDetail: false,
							showTeamDetail:false })}>Hide</button>
                    	<PlayerDetail />
                	</div>
				</div>
                
            )
		}
		if(this.state.showTeamDetail) {
            return (
                <div>
					<div>
						{this.renderContent()}
					</div>
					<div>
                    	<TeamDetail />
                	</div>
				</div>
            )
        }
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps,actions)(Profile);