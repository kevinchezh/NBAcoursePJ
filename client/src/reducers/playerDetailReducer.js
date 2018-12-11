import {FETCH_PLAYER_DETAIL} from '../actions/types';


export default function(state={}, action){
    switch(action.type){
        case FETCH_PLAYER_DETAIL:
            return action.payload;
        default:
            return state;
    }
}
