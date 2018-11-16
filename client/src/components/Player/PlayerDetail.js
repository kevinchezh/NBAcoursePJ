import React, {Component} from 'react';
import {connect} from 'react-redux';
class PlayerDetail extends Component {
    renderStats(){

    }
    render(){
        return(
            <div>
                {this.renderStats()}
            </div>
            
        )
    }
}
function mapStateToProps(state){
    return {
        player: state.player
    } 
    
}
export default connect(mapStateToProps)(PlayerDetail)
