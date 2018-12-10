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
        const query = sql = "select TEAM_NAME,format(AVG(W),2) as avrage_win,format(AVG(L),2) as average_loss,format(SUM(W)/(SUM(W+L)),2) as average_WPCT \
        ,format(SUM((W+L)*FG_PCT)/SUM(W+L),2) AS average_FGPCT \
        ,format(SUM((W+L)*PTS)/SUM(W+L),2) as average_pts,format(SUM((W+L)*AST)/SUM(W+L),2) as average_ast \
        ,format(SUM((W+L)*REB)/SUM(W+L),2) as average_REB FROM RegSeasonTeam Where TEAM_NAME = '"+req.query.teamName+"' GROUP BY TEAM_NAME";
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                res.send(result);
            }
        })   
    })
    app.get('/server/team/detail/:teamName/player', (req,res)=>{
        const query = `SELECT DISTINCT PLAYER, year, PTS, REB, AST, MIN, FG_PCT, FG3_PCT
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

    app.get('/server/team/draw', (req,res)=>{
        // console.log('in draw data fetch page');
        // console.log(req.query.property);
        var query = "select year, "+ req.query.property  + " from RegSeasonTeam where TEAM_NAME = '" + req.query.teamName + "' ORDER BY year";
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