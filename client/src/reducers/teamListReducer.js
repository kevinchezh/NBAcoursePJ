
import {FETCH_TEAM_LIST} from '../actions/types';


export default function(state=[], action){
    switch(action.type){
        case FETCH_TEAM_LIST:
            return action.payload;
        default:
            return state;
    }
}
// import {FETCH_TEAM_LIST} from '../actions/types';


// export default async function(state=[], action){
//     // console.log("in TEAMReducer");
//     // console.log(action);
//     // console.log(action.payload);
//     const res = await axios.get('/server/team/renderList')
//     console.log(res.data);

//     switch(action.type){
//         case FETCH_TEAM_LIST:
//             console.log('herherhehehrh')
//             console.log(action);
//             return action.payload;
//         default:
//             return state;
//     }
// }

// import {FETCH_TEAM_LIST} from '../actions/types';
// import axios from 'axios';

// // export default async function(state=[], action){
//     async function nihao() {
//         console.log("in TEAMReducer12345");
//         const res = await axios.get('/server/team/renderList')
//         return res.data
//     }


// export default function() {
//     const output = nihao();
//     var res;
//     output.then(function(data) {
//         return data
//     })
//     console.log(output)
//     return ""
// }

// export default function() {
//     return [
//         {TEAM_NAME: "Atlanta Hawks"},
//         {TEAM_NAME: "Boston Celtics"},
//         {TEAM_NAME: "Brooklyn Nets"},
//         {TEAM_NAME: "Charlotte Bobcats"},
//         {TEAM_NAME: "Charlotte Hornets"},
//         {TEAM_NAME: "Chicago Bulls"},
//         {TEAM_NAME: "Cleveland Cavaliers"},
//         {TEAM_NAME: "Dallas Mavericks"},
//         {TEAM_NAME: "Denver Nuggets"},
//         {TEAM_NAME: "Detroit Pistons"},
//         {TEAM_NAME: "Golden State Warriors"},
//         {TEAM_NAME: "Houston Rockets"},
//         {TEAM_NAME: "Indiana Pacers"},
//         {TEAM_NAME: "Los Angeles Clippers"},
//         {TEAM_NAME: "Los Angeles Lakers"},
//         {TEAM_NAME: "Memphis Grizzlies"},
//         {TEAM_NAME: "Miami Heat"},
//         {TEAM_NAME: "Milwaukee Bucks"},
//         {TEAM_NAME: "Minnesota Timberwolves"},
//         {TEAM_NAME: "New Jersey Nets"},
//         {TEAM_NAME: "New Orleans Hornets"},
//         {TEAM_NAME: "New Orleans Pelicans"},
//         {TEAM_NAME: "New Orleans/Oklahoma City Hornets"},
//         {TEAM_NAME: "New York Knicks"},
//         {TEAM_NAME: "Oklahoma City Thunder"},
//         {TEAM_NAME: "Orlando Magic"},
//         {TEAM_NAME: "Philadelphia 76ers"},
//         {TEAM_NAME: "Phoenix Suns"},
//         {TEAM_NAME: "Portland Trail Blazers"},
//         {TEAM_NAME: "Sacramento Kings"},
//         {TEAM_NAME: "San Antonio Spurs"},
//         {TEAM_NAME: "Seattle SuperSonics"},
//         {TEAM_NAME: "Toronto Raptors"},
//         {TEAM_NAME: "Utah Jazz"},
//         {TEAM_NAME: "Vancouver Grizzlies"},
//         {TEAM_NAME: "Washington Wizards"}
//     ]
// }