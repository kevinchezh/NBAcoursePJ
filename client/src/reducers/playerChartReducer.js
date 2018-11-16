import {FETCH_CHART_DATA} from '../actions/types';


export default function(state=[], action){
    console.log("in player chart data reducer");
    console.log(action);
    console.log(action.payload);
    switch(action.type){
        case FETCH_CHART_DATA:
            return action.payload;
        default:
            return state;
    }
}