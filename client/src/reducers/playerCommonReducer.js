import {FETCH_COMMON_TEAMMATES} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_COMMON_TEAMMATES:
            return action.payload;
        default:
            return state;
    }
}