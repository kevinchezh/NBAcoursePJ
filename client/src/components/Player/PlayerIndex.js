

//player root page, show player search component.
import React, {Component}  from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import PlayerForm from './PlayerForm';
import PlayerDetail from './PlayerDetail';
import TrivialCard from '../Trivial/TrivialCard';
class PlayerIndex extends Component {
    state = {showDetail: false};
    render(){
        if(this.state.showDetail){
            return (
                <div>
                    <PlayerDetail />   
                </div>                       
            )      
        }
        return (
            <div>
                <PlayerForm />
                {this.renderSearchResult()}
            </div>
        )
    }
    onClickHandler(PLAYER){
        this.setState({showDetail:true});
        this.props.showTrivialDetail(false);
        this.props.fetchPlayerDetail(PLAYER);
    }
    renderSearchResult(){
        // console.log("renderSearchResult")
        // console.log(this.props.player);
        if(this.props.player.length>0){
            // console.log("inside map");
            return this.props.player.map(oneRow => {
                return (
                    
                        <div key = {oneRow.PLAYER_ID + oneRow.year} className="card" >
                            {/* <img className="card-img-top" src="https://kodi.tv/sites/default/files/styles/medium_crop/public/addon_assets/plugin.video.nba/icon/icon.png?itok=UANlCIrN" alt="Card image cap"></img> */}
                            <div className="card-body">
                                <button className="card-title" onClick = {()=>this.onClickHandler(oneRow.PLAYER)}>{oneRow.PLAYER}</button>
                                {/* <p className="card-text"></p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">year: {oneRow.year}</li>
                                <li className="list-group-item">PTS: {oneRow.PTS}</li>
                                <li className="list-group-item">REB: {oneRow.REB}</li>
                                <li className="list-group-item">AST: {oneRow.AST}</li>
                                <li className="list-group-item">STL: {oneRow.STL}</li>
                            </ul>
                            {/* <div className="card-body">
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div> */}
                        </div>
                    
                )
            })
        }
    }
}
function mapStateToProps(state){
    // console.log("state player");
    // console.log(state.player);
    return {
        player: state.player,
        showTrivialDetail:state.showTrivialDetail
    }
}
export default connect(mapStateToProps,actions)(PlayerIndex);
