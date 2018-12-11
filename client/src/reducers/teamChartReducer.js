import {FETCH_TEAM_CHART} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_TEAM_CHART:
            return action.payload;
        default:
            return state;
    }
}