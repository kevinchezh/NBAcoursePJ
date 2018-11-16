import {FETCH_PLAYER_DETAIL} from '../actions/types';


export default function(state={}, action){
    console.log("in player detail reducer");
    console.log(action);
    console.log(action.payload);
    switch(action.type){
        case FETCH_PLAYER_DETAIL:
            return action.payload;
        default:
            return state;
    }
}
