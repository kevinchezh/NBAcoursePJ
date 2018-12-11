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
                // console.log(result);
                res.send(result);
            }
        })   
    })

    app.get('/server/team/history/:teamName/player', (req,res)=>{
        const query = "select T.TEAM_NAME,P.PLAYER, count(P.year) as time, round(sum(P.PTS*P.GP), 0) as total_pts, round((sum(P.PTS*P.GP) / sum(P.GP)), 2) as avg_pts, round(sum(P.AST*P.GP),0) AS total_ast, \
        round(sum(P.REB*P.GP),0) AS total_reb, format(avg(P.FG_PCT),2) as avg_pct,format(sum(P.PTS*P.GP) /T2.team_pts,3) as pts_rate,\
        format(sum(P.AST*P.GP)/ T2.team_ast,3) as ast_rate,\
        format(sum(P.REB*P.GP)/T2.team_reb,3) as reb_rate,  round(round(avg(P.FG_PCT),2) - T2.team_fgpct, 2) as fg_diff,T2.team_pts \
        FROM (RegSeasonPlayer P join RegSeasonTeam T on P.TEAM = T.TEAM_NAME AND P.year = T.year) \
        join (select sum(PTS*(W+L)) as team_pts,sum(AST*(W+L)) as team_ast, sum(REB*(W+L)) as team_reb,format(avg(FG_PCT),2) as team_fgpct,TEAM_NAME \
        FROM RegSeasonTeam Group by TEAM_NAME) T2 on T.TEAM_NAME = T2.TEAM_NAME \
        WHERE T.TEAM_NAME = '" + req.query.teamName + "' GROUP BY P.PLAYER ORDER BY time desc";
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
                // console.log(result);
                res.send(result);
            }
        })   
    })
    // app.get('/server/team',(req, res) => {
    //     res.send("player page");
    // })
}