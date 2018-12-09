import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';


class PlayerCompare extends Component{
    render(){
        return (
            <div className='container'>
                <h3> Input two players and compare their stats!</h3>
                <form onSubmit={this.props.handleSubmit(value => {console.log(value)})}>
                <div>
                    <Field type = 'text' placeholder = 'input a player name' name = 'playerOne' component='input'/>
                    <Field tupe = 'text' name = 'playerTwo' placeholder='input a player name' component='input'/>  
                <button type="submit" >
                  Compare!
                </button>
                <button type="button" onClick={()=>this.props.reset()}>
                  Clear
                </button>
                </div>
                </form>
            </div>
          )
    }
}

export default reduxForm(
    {
        form: 'playercompare',
        onSubmitSuccess: (value,dispatch, props) => {
           //  console.log("in on submit success")
            console.log("this is onSubmit Success");
            console.log(props.values);
        dispatch(actions.fetchPlayerCompare(props.values.playerOne, props.values.playerTwo));
            
    }
   }
   )(PlayerCompare);