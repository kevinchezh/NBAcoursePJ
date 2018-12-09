import {FETCH_TEAM_PLAYER} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_TEAM_PLAYER:
            return action.payload;
        default:
            return state;
    }
}