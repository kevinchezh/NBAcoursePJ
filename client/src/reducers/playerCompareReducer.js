import {FETCH_PLAYER_COMPARE} from '../actions/types';


export default function(state={}, action){
    // console.log("in player chart data reducer");
    // console.log(action);
    // console.log(action.payload);
    switch(action.type){
        case FETCH_PLAYER_COMPARE:
            return action.payload;
        default:
            return state;
    }
}