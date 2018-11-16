import {FETCH_PLAYER} from './types';
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