
import {FETCH_TEAM_LIST} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_TEAM_LIST:
            return action.payload;
        default:
            return state;
    }
}