import {FETCH_PLAYER, FETCH_PLAYER_DETAIL,FETCH_CHART_DATA, FETCH_TRIVIAL, SHOW_TRIVIAL_DETAIL, FETCH_PLAYER_COMPARE} from './types';
import axios from 'axios';


export const fetchPlayer = (value) => async dispatch => {
    // console.log("action creator in");
    // console.log(value);
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