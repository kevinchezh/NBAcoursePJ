import {FETCH_CHART_DATA} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_CHART_DATA:
            return action.payload;
        default:
            return state;
    }
}