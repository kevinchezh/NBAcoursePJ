import {FETCH_PLAYER, FETCH_PLAYER_DETAIL,FETCH_CHART_DATA, FETCH_TRIVIAL, SHOW_TRIVIAL_DETAIL} from './types';
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