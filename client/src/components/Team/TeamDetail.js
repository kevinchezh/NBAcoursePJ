import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'react-google-charts';
import * as actions from '../../actions';
import PlayerDetail from '../Player/PlayerDetail';
import _ from 'lodash';
class TeamDetail extends Component {
    state = {showDetail: false};
    render() {
        if(this.state.showDetail) {
            return (
                <div>
                    {/* <PlayerDetail /> */}
                    zai gai gai
                </div>
            )
        }
        return (
            <div>
                {this.renderTeamDetail()}
                {this.renderPlayerDetail()}
            </div>
        )
    }

    renderTeamDetail() {
        if(this.props.teamDetail.length > 0) {
            return (
                <div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">totalWin: {this.props.teamDetail[0].sumWin}</li>
                        <li className="list-group-item">totalLose: {this.props.teamDetail[0].sumLose}</li>
                    </ul>
                </div>
            )
        }
    }

    renderPlayerDetail() {
        if(this.props.teamPlayer.length > 0) {
            return this.props.teamPlayer.map((element) => {
                return (
                    <div key={element.PLAYER} className="card-body">
                        <button className="card-title" 
                                onClick = {()=>{
                                    console.log(element.PLAYER);
                                    this.setState({showDetail: true});
                                    // this.props.fetchPlayerDetail(element.PLAYER);
                                }}>
                            {element.PLAYER}
                        </button>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">year: {element.year}</li>
                            <li className="list-group-item">PTS: {element.PTS}</li>
                            <li className="list-group-item">REB: {element.REB}</li>
                            <li className="list-group-item">AST: {element.AST}</li>
                            <li className="list-group-item">MIN: {element.MIN}</li>
                        </ul>
                    </div>
                )
            })
        }
    }

}
function mapStateToProps(state){
    console.log("map state in team detail");
    console.log(state);
    return {
        teamDetail: state.teamDetail,
        teamPlayer: state.teamPlayer
    } 
    
}
export default connect(mapStateToProps,actions)(TeamDetail)