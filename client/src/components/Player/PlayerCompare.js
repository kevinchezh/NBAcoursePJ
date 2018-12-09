import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import '../../Styles/player.css';

class PlayerCompare extends Component{
    render(){
        return (
            <div className='container compareForm'>
                <h2 className = 'playerFormTitle'>Input two players and compare!</h2>
                <form onSubmit={this.props.handleSubmit(value => {console.log(value)})}>
                <div>
                    <Field className = 'FormBar' type = 'text' placeholder = 'input a player name' name = 'playerOne' component='input'/>
                </div>
                <div>
                    <Field className = 'FormBar' type = 'text' name = 'playerTwo' placeholder='input a player name' component='input'/>  
                </div>
                <div>
                <button className = 'btn btn-primary formButton' type="submit" >
                  Compare!
                </button>
                <button className = 'btn btn-secondary formButton' type="button" onClick={()=>this.props.reset()}>
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