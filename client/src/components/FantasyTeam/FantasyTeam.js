import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import FantasyTeamForm from './FantasyTeamForm';
import FantasyTeamResult from './FantasyTeamResult';

class FantasyTeam extends Component {
	state = {showResult: false};
	renderContent(){
		if(this.state.showResult){
			return(
				<div>
					<FantasyTeamResult onCancel={() => this.setState({showResult: false})} />
				</div>
			)
		}
		return(
			<FantasyTeamForm onSurveySubmit={() => this.setState({showResult: true})} />
		);	
	}
	render(){
		return(
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({
	form: 'fantasyForm',
})(FantasyTeam);