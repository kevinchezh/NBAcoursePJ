import { FETCH_5PLAYER_FANTASY } from '../actions/types';
export default function(state = null, action){
	switch(action.type){
		case FETCH_5PLAYER_FANTASY:
			return action.payload;
		default:
			return state;
	}
}