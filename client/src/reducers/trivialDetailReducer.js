import {SHOW_TRIVIAL_DETAIL} from '../actions/types';


export default function (state = [], action){
    console.log("in trivial reducer")
    switch(action.type){
        case SHOW_TRIVIAL_DETAIL:
            return action.payload;
        default:
            return state;
    }
}