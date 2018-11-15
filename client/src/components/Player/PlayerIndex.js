

//player root page, show player search component.
import React, {Component}  from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import PlayerForm from './PlayerForm';
import axios from 'axios';
class PlayerIndex extends Component {
    render(){
        return (
            <div>
                {/*  */}
                <PlayerForm />
            </div>
        )
    }
}

export default PlayerIndex;
// const PlayerIndex = ({playerName, fetchPlayer}) => {
//         console.log("this");
//         console.log(this);
//         return (
//             <div>
//                 {/* ends here need the form tag to complete the submit */}
//                 <form>
//                     <div className = 'container'>
//                         <input type = "text" className = 'form-control' name = "playerName" placeholder = "Please enter player name" />
//                     </div>
//                     {/* call action creator fetchPlayer */}
//                     {/* fetchPlayer(playerName) */}
//                     <div>
//                         <button className = 'btn btn-primary' 
//                         onClick = {() => {console.log(this.props)}}>Submit</button>
//                     </div>
//                 </form>
                
//             </div>
            
            
//         )
    
// }

// function mapStateToProps(state){
//     console.log("state: below");
//     console.log(state);
//     return {
//         // playerStats: state.
//         playerName : state.player.playerName
//     }
// }
// export default connect(mapStateToProps,actions)(PlayerIndex)