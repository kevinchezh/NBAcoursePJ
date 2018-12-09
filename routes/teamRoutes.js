var dev = require('../config/dev');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : dev.mySQL_URL,
  user     : dev.mySQL_USER,
  password : dev.mySQL_PASSPORT,
  database: "cis550"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports = app => {
    app.get('/server/team/renderList', (req,res) => {
        var query = "SELECT DISTINCT TEAM_NAME FROM RegSeasonTeam";
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                res.send(result);
            }
        })    
    })
    app.get('/server/team/general', (req,res)=>{
        const query = `SELECT * FROM ${req.query.type === 'Post' ? 'Post' : 'Reg'}SeasonTeam 
                        WHERE TEAM_NAME LIKE "${req.query.teamName ? req.query.teamName : "%"}"
                            AND year LIKE "${req.query.year ? req.query.year : "%"}"`;
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                res.send(result);
            }
        })   
    })
    app.get('/server/team/detail/:teamName', (req,res)=>{
        const query = `SELECT SUM(W) as sumWin, SUM(L) as sumLose
                       FROM RegSeasonTeam 
                       WHERE TEAM_NAME LIKE "${req.query.teamName}"`;
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                res.send(result);
            }
        })   
    })
    app.get('/server/team/detail/:teamName/player', (req,res)=>{
        const query = `SELECT DISTINCT PLAYER, PTS, REB, AST, MIN, FG_PCT, FG3_PCT
                       FROM RegSeasonPlayer
                       WHERE TEAM="${req.query.teamName}" AND year=${req.query.year}
                       ORDER BY PTS DESC`;
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result);
                res.send(result);
            }
        })   
    })
    // app.get('/server/team',(req, res) => {
    //     res.send("player page");
    // })
}