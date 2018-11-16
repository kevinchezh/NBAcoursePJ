import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import playerDetailReducer from './playerDetailReducer'
import {reducer as playerSearch} from 'redux-form';
export default combineReducers({
    player: playerReducer,
    form : playerSearch,
    playerDetail: playerDetailReducer
});