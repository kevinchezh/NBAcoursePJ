

import {FETCH_PLAYER, FETCH_PLAYER_DETAIL,FETCH_CHART_DATA, FETCH_USER, FETCH_TRIVIAL, 
    SHOW_TRIVIAL_DETAIL, FETCH_PLAYER_COMPARE, FETCH_TEAM, FETCH_TEAM_LIST, FETCH_TEAM_DETAIL, 
    FETCH_TEAM_PLAYER,FETCH_COMMON_TEAMMATES, FETCH_TEAM_CHART, FETCH_HISTORY_PLAYER, FETCH_PLAYER_FANTASY, FETCH_5PLAYER_FANTASY} from './types';

//make ajax request to the backend API
import axios from 'axios';


export const fetchPlayer = (value) => async dispatch => {
    console.log(value);
    const res = await axios.get('/server/player/' + value.playerName +'/' + value.season
    , {
        params:
            {
                playerName : value.playerName,
                year : value.year,
                season: value.season,
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
    // console.log("detail action");
    // console.log(playerName);

    const res = await axios.get('/server/player/detail/' + playerName);

    dispatch(
        {
            type:FETCH_PLAYER_DETAIL,
            payload: res.data
        }
    )
}
export const fetchCommonTeammates = (playerOne, playerTwo) => async dispatch => {
    const res = await axios.get('/server/player/commonTeammates/' + playerOne + '/' + playerTwo);
    dispatch(
        {
            type:FETCH_COMMON_TEAMMATES,
            payload: res.data
        }
    )
}
export const fetchPlayerCompare = (playerOne, playerTwo) => async dispatch =>{
    const res1 = await axios.get('/server/player/detail/' + playerOne);
    const res2 = await axios.get('/server/player/detail/' + playerTwo);
    const res = [
        res1.data,
        res2.data
    ]

    dispatch({
        type:FETCH_PLAYER_COMPARE,
        payload: res
    }   
    )
}
export const drawCharts = (property) => async dispatch => {
    // console.log('draw chart action');
    // console.log(property);

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

export const drawTeamCharts = (property) => async dispatch => {
    // console.log('draw team chart action');
    // console.log(property);

    const res = await axios.get('/server/team/draw', {
        params:{
            property: property.property,
            teamName: property.teamName
        }
    });
    dispatch({
        type:FETCH_TEAM_CHART,
        payload: res.data
    })
}


export const fetchTeamList = (value) => async dispatch => {
    // console.log("action team creator in");
    // console.log(value);
    const res = await axios.get('/server/team/renderList')
    dispatch({
        type: FETCH_TEAM_LIST,
        payload: res.data
    })
}

export const fetchTeam = (value) => async dispatch => {
    // console.log("fetch team success");
    // console.log(value);
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
    // console.log("fetch detail successful");
    // console.log(teamName);
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
    // console.log("fetch detail successful");
    // console.log(year);
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

export const fetchHistoryPlayer = (teamName) => async dispatch => {
    // console.log("fetch lalalalalalal detail successful");
    // console.log(year);
    const res = await axios.get('/server/team/history/:' + teamName + '/player', {
        params:{
            teamName
        }
    });
    dispatch({
        type: FETCH_HISTORY_PLAYER,
        payload: res.data
    })
}

export const fetchTrivialDetail = (trivialID) => async dispatch =>{
    const res = await axios.get('/server/trivial/'+trivialID);
    dispatch({
        type:FETCH_TRIVIAL,
        payload:res.data
    })
}

export const showTrivialDetail = (showDetail)=> {
    return({
        type:SHOW_TRIVIAL_DETAIL,
        payload:showDetail
    })
}

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data});
}

export const editProfile = async (values) => {
    if(values.favoritePlayer && values.favoriteTeam){
        await axios.post('/api/editProfile', values);
    }
}

export const fetchPlayerForFantasy = (playerName) => async dispatch => {
    const res = await axios.get('/server/fantasy/' + playerName);
    dispatch(
        {
            type: FETCH_PLAYER_FANTASY,
            payload: res.data
        }
    )
}

export const fetchPlayerForFiveFantasy = (values) => async dispatch => {
    const route = '/server/fivePlayerFantasy/' + values.Player1 + '/' + values.Player2 + '/' + values.Player3 + '/' + values.Player4 + '/' + values.Player5;
    const res = await axios.get(route);
    dispatch(
        {
            type: FETCH_5PLAYER_FANTASY,
            payload: res.data
        }
    )
}

