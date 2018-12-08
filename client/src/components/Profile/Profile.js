import React, {Component} from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import ProfileForm from './ProfileForm';

class Profile extends Component {
	renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <p>you need to login</p>;
            default:
                return(
                <div>
                    <h2>{this.props.auth._id}</h2>
                	<h3>your favorite player is <strong>
                		<a href="#"> {this.props.auth.favoritePlayer} </a>
                		</strong>
                	</h3>
                	<h3>your favorite team is <strong>
                		<a href="#">{this.props.auth.favoriteTeam}</a>
                		</strong>
                	</h3>
                	<p>Do you want to edit your favorite player and team?</p>
                    <ProfileForm />
                </div>
                );
        }
    }
	render() {
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

export default connect(mapStateToProps)(Profile);