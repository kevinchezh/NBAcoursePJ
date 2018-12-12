import { FETCH_PLAYER_FANTASY } from '../actions/types';
export default function(state = null, action){
	//console.log(action);
	switch(action.type){
		case FETCH_PLAYER_FANTASY:
			return action.payload || false;
		default:
			return state;
	}
}