//form of player search using redux form
import React, {Component}  from 'react';
import * as actions from '../../actions';
//helper to set up communication between redux store and redux form
//just like the connect fuction in react-redux
import {reduxForm, Field} from 'redux-form';
import FilterField from './PlayerFilterField';
//Field is a component that could render any html form tags 
import _ from 'lodash';

const FILTER = [
    {label : 'points minimum', name: 'PTSlo'},
    {label : 'points maximum', name: 'PTShi'},
    {label : 'rebound minimum', name: 'REBlo'},
    {label : 'rebound maximum', name: 'REBhi'},
    {label : 'assist minimum', name: 'ASTlo'},
    {label : 'assist maximum', name: 'ASThi'},
    {label : 'steal minimum', name: 'STLlo'},
    {label : 'steal maximum', name: 'STLhi'}
]
class PlayerForm extends Component {
    renderAdvanceFilter(){
        return _.map(FILTER, (filter) => {
            return (
                <Field key = {filter.name} name = {filter.name} type = 'text' component={FilterField} label = {filter.label}/>
            )
        })
    }
    render(){
        return (
            <div>
                {/* handleSubmit is a function inside reduxForm, this function would be called 
                everytime we submit the form*/}
                <form  onSubmit = {this.props.handleSubmit(value => {console.log(value)})}>
                {/* name is the name we refer to the value of this input */}
                {/* Field component would automatically save the input to redux store under the 
                key name 'playerName' we defined */}
                {/* Still need to figure out what is happening behind the scene */}

                {/* component property could take in the actual custom component we defined */}
                <Field type='text' name='playerName' component='input'/>
                <div>
                <Field name="year" component="select" >
                    <option>Select Year</option>
                    <option value = '2018'>2018</option>
                    <option value = '2017'>2017</option>
                    <option value = '2016'>2016</option>
                    <option value = '2015'>2015</option>
                    <option value = '2014'>2014</option>
                    <option value = '2013'>2013</option>
                    <option value = '2012'>2012</option>
                    <option value = '2011'>2011</option>
                    <option value = '2010'>2010</option>
                    <option value = '2009'>2009</option>
                    <option value = '2008'>2008</option>
                    <option value = '2007'>2007</option>
                    <option value = '2006'>2006</option>
                    <option value = '2005'>2005</option>
                    <option value = '2004'>2004</option>
                    <option value = '2003'>2003</option>
                    <option value = '2002'>2002</option>
                    <option value = '2001'>2001</option>
                    <option value = '2000'>2000</option>
                </Field>
                <Field name="season" component="select" >
                    <option>Select season</option>
                    <option value = 'reg'>Regular Season</option>
                    <option value = 'post'>Post Season</option>
                </Field>
                {this.renderAdvanceFilter()}
        </div>
                <button className = 'btn btn-outline-secondary' onClick={()=>this.props.reset()}>Clear</button>
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
     onSubmitSuccess: (value,dispatch, props) => {
        //  console.log("in on submit success")
        //  console.log(props.values);
         dispatch(actions.fetchPlayer(props.values));
     }
}
)(PlayerForm);