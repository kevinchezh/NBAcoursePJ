import React, {Component}  from 'react';
import * as actions from '../../actions';
import {fetchTeamList} from '../../actions/index'
import {connect} from 'react-redux';

class TeamList extends Component {
    render() {
        this.fetchTeamRes()
        console.log(this.props)
        if(this.props.teamList.length > 0) {
            return this.props.teamList.map((teamList) => {
                return (
                    <option value={teamList.TEAM_NAME} key={teamList.TEAM_NAME}>{teamList.TEAM_NAME}</option>
                )
            })
        }else {
            return (
                <option value="nothing">nothing</option>
            )
        }
    }

    fetchTeamRes() {
        fetchTeamList('wang');
        console.log('fetchSUccess');
    }
}

function mapStateToProps(state){
    // console.log("state Team");
    // console.log(state.Team);
    console.log(state)
    return {
        teamList: state.teamList
    }
}
export default connect(mapStateToProps,fetchTeamList)(TeamList);

// class TeamList extends Component {
//     render() {
//         this.fetchTeamRes()
//         console.log("props is hererhehrheherh")
//         console.log(this.props)
//         return (
//             this.renderSearchResult()
//         )
//     }
//     renderSearchResult() {
//         if(this.props.teamList.length > 0) {
//             console.log(this.props.teamList);
//             return this.props.teamList.map((teamList) => {
//                 return (
//                     <option value={teamList.TEAM_NAME}>{teamList.TEAM_NAME}</option>
//                 )
//             })
//         }
//     }

//     fetchTeamRes() {
//         fetchTeamList('wang');
//         console.log('fetchSUccess');
//     }
// }

// function mapStateToProps(state){
//     // console.log("state Team");
//     // console.log(state.Team);
//     console.log(state)
//     return {
//         teamList: state.teamList
//     }
// }
// export default connect(mapStateToProps,fetchTeamList)(TeamList);