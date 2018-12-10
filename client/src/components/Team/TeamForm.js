import React, {Component}  from 'react';
import * as actions from '../../actions';
import {reduxForm, Field} from 'redux-form';

import TeamList from './TeamList'
import _ from 'lodash';
import '../../Styles/team.css';

class TeamForm extends Component {
    render() {
        return (
            <div>
                {/* <TeamList /> */}
                <form onSubmit = {this.props.handleSubmit(value => {console.log(value)})}>
                <Field classname="teamSearch1" name="teamName" component="select" >
                    <option>Select Team</option>
                    <TeamList />
                </Field>
                <Field classname="teamSearch" name="year" component="select" >
                    <option>Select Year</option>
                    {this.renderYear()}
                </Field>
                <Field classname="teamSearch" name="type" component="select" >
                    <option key="Reg" value="Reg">Regular Season</option>
                    <option key="Post" value="Post">Post Season</option>
                </Field>
                <button className='btn btn-primary teamButton' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
    renderYear() {
        let year = 2000;
        let yearList = [];
        while(year <= 2018) {
            yearList.push(year);
            year++;
        }
        return yearList.map((year) => {
            return (
                <option key={year} value={year}>{year}</option>
            )
        })
    }
}

export default reduxForm(
    {
        form: 'playerSearch',
        onSubmitSuccess: (value,dispath, props) => {
            console.log("in on submit success")
            console.log(props.values);
            dispath(actions.fetchTeam(props.values));
        }
   }
)(TeamForm);