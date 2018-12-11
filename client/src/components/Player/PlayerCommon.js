import React, {Component} from 'react';
import * as actions from '../../actions';
import {reduxForm, Field} from 'redux-form';
import '../../Styles/player.css';
import {connect} from 'react-redux';
import _ from 'lodash';
import PlayerDetail from './PlayerDetail';
class PlayerCommon extends Component{
    state = {showDetail: false};
    renderForm(){
        return (
            <div className='container commonForm'>
                <h2 className = 'commonFormTitle'>Input two players to find their common teammates!</h2>
                <form onSubmit={this.props.handleSubmit(value => {console.log(1)})}>
                <div>
                    <Field className = 'FormBar' type = 'text' placeholder = 'input a player name' name = 'playerOne' component='input'/>
                </div>
                <div>
                    <Field className = 'FormBar' type = 'text' name = 'playerTwo' placeholder='input a player name' component='input'/>  
                </div>
                <div>
                <button className = 'btn btn-primary formButton' type="submit" >
                Find teammates!
                </button>
                <button className = 'btn btn-secondary formButton' type="button" onClick={()=>this.props.reset()}>
                Clear
                </button>
                </div>
                </form>
            </div>
        )
    }
    render(){
        // console.log(this.props.commonTeammates);
        
        if(this.props.commonTeammates.length>0){
            if(this.state.showDetail){
                return (
                    <div className='showDetail'>
                        <button className = 'btn btn-outline-secondary' onClick = {()=>this.setState({ showDetail: false })}>Back</button>
                        <PlayerDetail />   
                    </div>                       
                )      
            }
            return (
                <div>
                    <div className = 'commonTeammatesForm'>
                        {this.renderForm()}
                    </div>
                    <div >
                        {this.renderResult()}
                    </div>                   
                </div>              
            )
        }
        
        return (
            <div>
                {this.renderForm()}
            </div>
            
        )
        
    }
    renderResult(){
        return(
            _.map(this.props.commonTeammates,player=>{
                return (
                    <div className = 'commonTeammatesResult'>
                        
                        <button className="card-title" 
                                onClick = {()=>{
                                    // console.log(player.PLAYER);
                                    this.setState({showDetail: true});
                                    this.props.fetchPlayerDetail(player.Player);
                                    // this.props.fetchPlayerDetail(element.PLAYER);
                                }}>
                            Player : {player.Player}
                        </button>
                    </div>
                )
            })
        )
    }
}
function mapStateToProps(state){
    return {
        commonTeammates:state.playerCommon
    } 
    
}
PlayerCommon =  connect(mapStateToProps,actions)(PlayerCommon)
export default reduxForm(
 {
     form: 'PlayerCommon',
     onSubmitSuccess: (value,dispatch, props) => {
        //  console.log("in on submit success")
        //  console.log(props.values);
         dispatch(actions.fetchCommonTeammates(props.values.playerOne, props.values.playerTwo));
     }
}
)(PlayerCommon);

