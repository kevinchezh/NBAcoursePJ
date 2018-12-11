import React, {Component}  from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import TeamForm from './TeamForm';
import TeamDetail from './TeamDetail';
import '../../Styles/team.css';
import TrivialCard from '../Trivial/TrivialCard'
class TeamIndex extends Component {
    state={renderChoice:1}
    render() {
        if(this.state.renderChoice === 1) {
            return (
                <div className = 'row'>
                    <div className = 'col-9'>
                        <TeamForm />
                        {this.renderButton()}
                        {this.renderSearchResult()}
                    </div>
                    <div className = 'col-3'>
                        <TrivialCard  />
                    </div>
                </div>
            )
        } else if(this.state.renderChoice === 2){
            return (
                <div className = 'row'>
                    <div className = 'col-9'>
                        <TeamDetail />
                    </div>
                    
                    {/* <div className = 'col-3'>
                        <TrivialCard  />
                    </div> */}
                </div>
            )
        } else {
            return (
                <div>
                    Loading
                </div>
            )
        }
    }

    renderButton() {
        return (
            <button id="boston" class="boston" onClick={() => {
                this.setState({renderChoice:2});
                this.props.fetchTeamDetail("Boston Celtics");
            }}>
            <img className = 'teamIcon' src="http://content.sportslogos.net/logos/6/213/full/slhg02hbef3j1ov4lsnwyol5o.png" /></button>
        )
    }

    renderSearchResult() {
        if(this.props.team.length > 0) {
            // console.log(this.props.team);
            return this.props.team.map((oneTeam) => {
                return (
                    <div key={oneTeam.TEAM_ID+oneTeam.year} className="searchResult needInline card">
                        <div className="teamCardName">
                            <button className="card-teamTitle" 
                                    onClick = {()=>{
                                        // console.log(oneTeam.TEAM_NAME)
                                        // console.log(oneTeam.year);
                                        this.setState({renderChoice:2});
                                        this.props.fetchTeamDetail(oneTeam.TEAM_NAME);
                                        this.props.fetchTeamPlayer(oneTeam.TEAM_NAME, oneTeam.year);
                                    }}>
                                    {oneTeam.TEAM_NAME}
                            </button>
                        </div>
                    
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">year: {oneTeam.year}</li>
                            <li className="list-group-item">W: {oneTeam.W}</li>
                            <li className="list-group-item">L: {oneTeam.L}</li>
                            <li className="list-group-item">W_PCT: {oneTeam.W_PCT}</li>
                            <li className="list-group-item">PTS: {oneTeam.PTS}</li>
                            <li className="list-group-item">FG_PCT: {oneTeam.FG_PCT}</li>
                        </ul>
                    
                    </div>
                )
            })
        }
    }
}


function mapStateToProps(state){
    // console.log("state Team");
    // console.log(state.team);
    return {
        team: state.team
    }
}
export default connect(mapStateToProps,actions)(TeamIndex);