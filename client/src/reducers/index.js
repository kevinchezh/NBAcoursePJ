import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import playerDetailReducer from './playerDetailReducer';
import {reducer as playerSearch} from 'redux-form';
import playerChartReducer from './playerChartReducer'
import playerCommonReducer from './playerCommonReducer'
import teamReducer from './teamReducer';
import teamDetailReducer from './teamDetailReducer'
import teamListReducer from './teamListReducer';
import teamPlayerReducer from './teamPlayerReducer';
import teamChartReducer from './teamChartReducer';

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
    playerCommon: playerCommonReducer,

    teamList: teamListReducer,
    team: teamReducer,
    teamPlayer: teamPlayerReducer,
    teamDetail: teamDetailReducer,
    teamChart: teamChartReducer,

    trivial:trivialReducer,
    showTrivialDetail:trivialDetailReducer,
    playerCompare: playerCompareReducer,
    //auth is the key in the state store
    //auth will be manufactured by authReducer
    auth: authReducer,
    profileform: profileEditForm

});