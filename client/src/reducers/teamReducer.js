import {FETCH_TEAM} from '../actions/types';


export default function(state=[], action){
    // console.log("in TEAMReducer");
    // console.log(action);
    // console.log(action.payload);
    switch(action.type){
        case FETCH_TEAM:
            return action.payload;
        default:
            return state;
    }
}