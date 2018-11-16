import React, {Component} from 'react';
import {connect} from 'react-redux';
class PlayerDetail extends Component {
    renderStats(){
        console.log("renderStats")
        console.log(this.props.playerDetail[0].PLAYER)
        return(
            <div className = 'container'>
            <div>
                {this.props.playerDetail[0].PLAYER}
            </div>
            <div>
                Points on average is :
                {this.props.playerDetail[0].average}
            </div>
        </div>
        )
        
        
    }
    render(){
        if(this.props.playerDetail.length>0){
            return(
                <div>
                    {
                       this.renderStats()}      
                </div>
                
            )
        }
        return "Loading..."
        
    }
}
function mapStateToProps(state){
    console.log("map state in player detail");
    console.log(state);
    return {
        playerDetail: state.playerDetail
    } 
    
}
export default connect(mapStateToProps)(PlayerDetail)
