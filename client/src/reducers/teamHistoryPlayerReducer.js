import {FETCH_HISTORY_PLAYER} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_HISTORY_PLAYER:
            // console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}