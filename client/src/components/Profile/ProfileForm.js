import React, {Component} from 'react';
//alomst same as the component connect helper to connect to the store
import {reduxForm, Field} from 'redux-form';
import ProfileField from './ProfileField';
import { connect } from 'react-redux';
import {editProfile} from '../../actions';

class ProfileForm extends Component {
	renderFields(){
		return(
			<div>
				<Field
					label="favoritePlayer"
					type="text"
					name="favoritePlayer"
					component={ProfileField}
				/>
				<Field
					label="favoriteTeam"
					type="text"
					name="favoriteTeam"
					component={ProfileField}
				/>
			</div>
		);
	}
	render(){
		return(
			<div>
				<form
					onSubmit={this.props.handleSubmit(values => editProfile(values))}
				>
				{this.renderFields()}
				<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

//whatever we return from the mapStateToProps will show up as props in the ProfileForm props
function mapStateToProps(state) {
	
	return {formValues: state.form.profileForm};
}
ProfileForm = connect(mapStateToProps, editProfile)(ProfileForm)

export default reduxForm({
	form: 'profileForm'
})(ProfileForm);