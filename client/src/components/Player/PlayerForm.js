//form of player search using redux form
import React, {Component}  from 'react';
import * as actions from '../../actions';
//helper to set up communication between redux store and redux form
//just like the connect fuction in react-redux
import {reduxForm, Field} from 'redux-form';
//Field is a component that could render any html form tags 

class PlayerForm extends Component {
    render(){
        return (
            <div>
                {/* handleSubmit is a function inside reduxForm, this function would be called 
                everytime we submit the form*/}
                <form onSubmit = {this.props.handleSubmit(value => {})}>
                {/* name is the name we refer to the value of this input */}
                {/* Field component would automatically save the input to redux store under the 
                key name 'playerName' we defined */}
                {/* Still need to figure out what is happening behind the scene */}

                {/* component property could take in the actual custom component we defined */}
                <Field type='text' name='playerName' component='input'/>

                <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
//redux form requires one property: form from form reducers
export default reduxForm(
 {
     form: 'playerSearch',
     onSubmitSuccess: (value,dispath, props) => {
        //  console.log("in on submit success")
        //  console.log(props.values.playerName);
         dispath(actions.fetchPlayer(props.values.playerName));
     }
}
)(PlayerForm);