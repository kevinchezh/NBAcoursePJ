import {FETCH_PLAYER} from '../actions/types';


export default function(state=[], action){
    // console.log("in playerReducer");
    // console.log(action);
    // console.log(action.payload);
    switch(action.type){
        case FETCH_PLAYER:
            return action.payload;
        default:
            return state;
    }
}