import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import playerDetailReducer from './playerDetailReducer';
import {reducer as playerSearch} from 'redux-form';
import playerChartReducer from './playerChartReducer'
import trivialReducer from './trivialReducer'
import trivialDetailReducer from './trivialDetailReducer'
import playerCompareReducer from './playerCompareReducer';
import {reducer as profileEditForm} from 'redux-form';
import authReducer from './authReducer';
export default combineReducers({
    player: playerReducer,
    form : playerSearch,
    playerDetail: playerDetailReducer,
    playerChartData:playerChartReducer,
    trivial:trivialReducer,
    showTrivialDetail:trivialDetailReducer,
    playerCompare: playerCompareReducer,
    //auth is the key in the state store
    //auth will be manufactured by authReducer
    auth: authReducer,
    profileform: profileEditForm
});