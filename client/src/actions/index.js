import {FETCH_PLAYER, FETCH_PLAYER_DETAIL,FETCH_CHART_DATA, FETCH_TEAM, FETCH_TEAM_LIST, FETCH_TEAM_DETAIL, FETCH_TEAM_PLAYER} from './types';
import axios from 'axios';

export const fetchPlayer = (value) => async dispatch => {
    console.log("action creator in");
    console.log(value);
    const res = await axios.get('/server/player/' + value.playerName + '/'+value.year
    , {
        params:
            {
                playerName : value.playerName,
                year : value.year,
                PTSlo : value.PTSlo,
                PTShi : value.PTShi,
                REBlo: value.REBlo,
                REBhi: value.REBhi,
                ASTlo: value.ASTlo,
                ASThi: value.ASThi,
                STLlo: value.STLlo,
                STLhi: value.STLhi
            }
    });
    dispatch({
        type: FETCH_PLAYER,
        payload: res.data
    })
}

export const fetchPlayerDetail = (playerName) => async dispatch => {
    console.log("detail action");
    console.log(playerName);

    const res = await axios.get('/server/player/detail/' + playerName);

    dispatch(
        {
            type:FETCH_PLAYER_DETAIL,
            payload: res.data
        }
    )
}
export const drawCharts = (property) => async dispatch => {
    console.log('draw chart action');
    console.log(property);

    const res = await axios.get('/server/player/draw', {
        params:{
            property: property.property,
            playerName: property.playerName
        }
    });
    dispatch({
        type:FETCH_CHART_DATA,
        payload: res.data
    })
}

export const fetchTeamList = (value) => async dispatch => {
    console.log("action team creator in");
    console.log(value);
    const res = await axios.get('/server/team/renderList')
    dispatch({
        type: FETCH_TEAM_LIST,
        payload: res.data
    })
}

export const fetchTeam = (value) => async dispatch => {
    console.log("fetch team success");
    console.log(value);
    const res = await axios.get('/server/team/general', {
        params: {
            teamName:value.teamName,
            year: value.year,
            type: value.type
        }
    });
    dispatch({
        type: FETCH_TEAM,
        payload: res.data
    })
}

export const fetchTeamDetail = (teamName) => async dispatch => {
    console.log("fetch detail successful");
    console.log(teamName);
    const res = await axios.get('/server/team/detail/:' + teamName, {
        params:{
            teamName
        }
    });
    dispatch({
        type: FETCH_TEAM_DETAIL,
        payload: res.data
    })
}

export const fetchTeamPlayer = (teamName, year) => async dispatch => {
    console.log("fetch detail successful");
    console.log(year);
    const res = await axios.get('/server/team/detail/:' + teamName + '/player', {
        params:{
            teamName,
            year
        }
    });
    dispatch({
        type: FETCH_TEAM_PLAYER,
        payload: res.data
    })
}

// export const identifyProperty = (value) => async dispatch => {
//         const val = {
//             property:value,
//             p
//         }
// }