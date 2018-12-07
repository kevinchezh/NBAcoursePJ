import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import playerDetailReducer from './playerDetailReducer';
import {reducer as playerSearch} from 'redux-form';
import playerChartReducer from './playerChartReducer';
import authReducer from './authReducer';
export default combineReducers({
    player: playerReducer,
    form : playerSearch,
    playerDetail: playerDetailReducer,
    playerChartData:playerChartReducer,
    //auth is the key in the state store
    //auth will be manufactured by authReducer
    auth: authReducer
});