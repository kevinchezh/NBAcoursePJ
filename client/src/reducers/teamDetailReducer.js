import {FETCH_TEAM_DETAIL} from '../actions/types';


export default function(state={}, action){
    switch(action.type){
        case FETCH_TEAM_DETAIL:
            return action.payload;
        default:
            return state;
    }
}