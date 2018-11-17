import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import playerDetailReducer from './playerDetailReducer'
import {reducer as playerSearch} from 'redux-form';
import playerChartReducer from './playerChartReducer'
import trivialReducer from './trivialReducer'
import trivialDetailReducer from './trivialDetailReducer'
export default combineReducers({
    player: playerReducer,
    form : playerSearch,
    playerDetail: playerDetailReducer,
    playerChartData:playerChartReducer,
    trivial:trivialReducer,
    showTrivialDetail:trivialDetailReducer
});