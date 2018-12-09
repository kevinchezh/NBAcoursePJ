import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import playerDetailReducer from './playerDetailReducer'
import {reducer as playerSearch} from 'redux-form';
import playerChartReducer from './playerChartReducer'

import teamReducer from './teamReducer';
import teamDetailReducer from './teamDetailReducer'
import teamListReducer from './teamListReducer';
import teamPlayerReducer from './teamPlayerReducer';

export default combineReducers({
    player: playerReducer,
    form : playerSearch,
    playerDetail: playerDetailReducer,
    playerChartData:playerChartReducer,

    teamList: teamListReducer,
    team: teamReducer,
    teamPlayer: teamPlayerReducer,
    teamDetail: teamDetailReducer
});