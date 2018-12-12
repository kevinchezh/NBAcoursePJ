import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'react-google-charts';
import * as actions from '../../actions';
import _ from 'lodash';

import '../../Styles/player.css';
class PlayerRating extends Component {
    renderSearchResult(){
        // console.log("renderSearchResult")
        // console.log(this.props.player);
        if(this.props.player.length>0 && this.props.player.length<1000){
            // console.log("inside map");
            return this.props.player.map(oneRow => {
                return (
                        
                        <div key = {oneRow.PLAYER_ID + oneRow.year} className=" searchResult needInline card" >
                            {/* <img className="card-img-top" src="https://kodi.tv/sites/default/files/styles/medium_crop/public/addon_assets/plugin.video.nba/icon/icon.png?itok=UANlCIrN" alt="Card image cap"></img> */}
                            <div className="card-body searchCard">
                                <button className="card-title searchCardPlayerName" onClick = {()=>this.onClickHandler(oneRow.PLAYER)}>{oneRow.PLAYER}</button>
                                {/* <p className="card-text"></p> */}
                            </div>
                            <ul className="list-group list-group-flush searchCardList">
                                <li className="list-group-item searchCardItem">year: {oneRow.year}</li>
                                <li className="list-group-item searchCardItem">PTS: {oneRow.PTS}</li>
                                <li className="list-group-item searchCardItem">REB: {oneRow.REB}</li>
                                <li className="list-group-item searchCardItem">AST: {oneRow.AST}</li>
                                <li className="list-group-item searchCardItem">STL: {oneRow.STL}</li>
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
    render(){
        return(
            {this.renderSearchResult()}
        )
    }
}
function mapStateToProps(state){
    return {
        rating:state.fantasySearch
        // trivial: state.trivial
    } 
    
}
export default connect(mapStateToProps,actions)(PlayerRating)
