import {FETCH_TRIVIAL} from '../actions/types';


export default function (state = [], action){
    // console.log("in trivial reducer")
    switch(action.type){
        case FETCH_TRIVIAL:
            return action.payload;
        default:
            return state;
    }
}