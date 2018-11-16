import {FETCH_PLAYER} from './types';
import axios from 'axios';

export const fetchPlayer = (value) => async dispatch => {
    // console.log("action creator in");
    // console.log(value);
    const res = await axios.get('/server/player/' + value);
    dispatch({
        type: FETCH_PLAYER,
        payload: res.data
    })
}