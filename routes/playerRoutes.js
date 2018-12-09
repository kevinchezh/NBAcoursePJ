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
    //here I handler trivial routes as well since there is not much routes for this one
    app.get('/server/trivial/:id',(req,res)=>{
        console.log("in trivial fetch page");
        console.log(req.params);
        const getQuery = ()=>{
            console.log(req.params.id);
            
        };
        const query = (
            function(){switch(req.params.id){
                case '1':
                return "select rp.player,format((pp.AST/rp.AST),2) as AST_RATIO, rp.year,pp.AST, rp.AST FROM RegSeasonPlayer rp join PostSeasonPlayer pp on rp.PLAYER_ID = pp.PLAYER_ID and pp.year = rp.year WHERE rp.AST > 8 ORDER BY AST_RATIO DESC LIMIT 10";
                case '2':
                return "Select rp.PLAYER, format((s.2018season/rp.PTS),2) as salary_Pts_Ratio from RegSeasonPlayer rp join Salary s on rp.PLAYER = s.Player where rp.PTS > 20 and rp.year = 2017 ORDER BY salary_Pts_Ratio LIMIT 10"
                case '3':
                return "Select rp.PLAYER, format((s.2018season/rp.PTS),2) as salary_Pts_Ratio from RegSeasonPlayer rp join Salary s on rp.PLAYER = s.Player where s.2018season>20000000 and rp.year = 2017 ORDER BY salary_Pts_Ratio desc LIMIT 10";
                case '4':
                return "select rp.PLAYER,rp.PTS,rp.year from RegSeasonPlayer rp join Salary s on rp.PLAYER = s.Player where rp.year = 2017 and s.2019season = 0 ORDER BY rp.PTS desc LIMIT 10";
                case '5':
                return "select rp.player,format((pp.AST/rp.AST),2) as AST_RATIO, rp.year,pp.AST, rp.AST FROM RegSeasonPlayer rp join PostSeasonPlayer pp on rp.PLAYER_ID = pp.PLAYER_ID and pp.year = rp.year WHERE rp.AST > 8 ORDER BY AST_RATIO DESC LIMIT 10";
                
                case '6':
                return 'SELECT p1.year,p1.PLAYER,p1.FG3_PCT,p1.TEAM \
                FROM RegSeasonPlayer p1 join \
                (SELECT t1.year,t1.TEAM_NAME FROM RegSeasonTeam t1 \
                WHERE (t1.FG3_PCT,t1.year) in (SELECT MAX(t2.FG3_PCT),t2.year FROM RegSeasonTeam t2 GROUP BY t2.year)) t \
                on t.year = p1.year and p1.TEAM = t.TEAM_NAME \
                WHERE 3>\
                (SELECT COUNT(DISTINCT p2.PLAYER) \
                FROM RegSeasonPlayer p2 \
                WHERE p2.FG3_PCT > p1.FG3_PCT AND p1.TEAM = p2.TEAM AND p1.year = p2.year)\
                ORDER BY p1.year DESC,p1.FG3_PCT DESC ';
                case '7':
                return 'SELECT p1.year,p1.PLAYER,p1.FG3_PCT,p1.TEAM \
                FROM PostSeasonPlayer p1 join \
                (SELECT t1.year,t1.TEAM_NAME FROM PostSeasonTeam t1 \
                WHERE (t1.FG3_PCT,t1.year) in (SELECT MAX(t2.FG3_PCT),t2.year FROM PostSeasonTeam t2 GROUP BY t2.year)) t \
                on t.year = p1.year and p1.TEAM = t.TEAM_NAME \
                WHERE 3>\
                (SELECT COUNT(DISTINCT p2.PLAYER) \
                FROM PostSeasonPlayer p2 \
                WHERE p2.FG3_PCT > p1.FG3_PCT AND p1.TEAM = p2.TEAM AND p1.year = p2.year)\
                ORDER BY p1.year DESC,p1.FG3_PCT DESC'
                ;
                case '8':
                return 'select p.PLAYER,t.TEAM_NAME,format(sum(p.GP*p.PTS),2) AS PLAYER_PT,format(sum((t.W+t.L)*t.PTS),2) AS TEAM_PT,format((sum(p.GP*p.PTS)/sum((t.W+t.L)*t.PTS)),2) AS CONT \
                FROM RegSeasonPlayer p join RegSeasonTeam t on p.year = t.year and p.TEAM = t.TEAM_NAME \
                GROUP BY p.PLAYER, t.TEAM_NAME \
                ORDER BY CONT DESC \
                LIMIT 10';
                case '9':
                return 'SELECT rp.PLAYER , rp.FG3_PCT,r.3Pt,format((rp.FG3_PCT/r.3Pt)*100,2) as ratio \
                FROM RegSeasonPlayer rp join Ratings r on rp.PLAYER = r.Player \
                WHERE rp.year = 2017 and r.3Pt > 75 \
                ORDER BY ratio DESC LIMIT 20';
            }}
        )();
        console.log(query);
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result);
                if(req.params.id==5) {
                    res.send([{
                             year: 2011,
                             PLAYER: 'LeBron James',
                             PTS: '30.3',
                             TEAM: 'Miami Heat' }])
                }
                else res.send(result);
            }
        })
    })
    app.get('/server/player/draw', (req,res)=>{
        // console.log('in draw data fetch page');
        // console.log(req.query.property);
        var query = "select year, "+ req.query.property  + " from RegSeasonPlayer where PLAYER = '" + req.query.playerName + "' ORDER BY year";
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result);
                res.send(result);
            }
        })   
    })
    app.get('/server/player/detail/:playerName', (req,res) => {
        // console.log('in player detail routes');
        // console.log(req.params);
        var query = sql = "SELECT PLAYER, format(SUM(GP*PTS)/SUM(GP),1) as PTS, \
        format(SUM(GP*AST)/SUM(GP),1) as AST,format(SUM(GP*REB)/SUM(GP),1) as REB, \
        format(SUM(GP*STL)/SUM(GP),1) as STL, format(SUM(GP*BLK)/SUM(GP),1) as BLK, \
        format(SUM(GP*FG_PCT)/SUM(GP),3) as FG_PCT,format(SUM(GP*FG3_PCT)/SUM(GP),3) as FG3_PCT \
        FROM RegSeasonPlayer WHERE PLAYER = '"+req.params.playerName + "' GROUP BY PLAYER" ;
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result);
                res.send(result);
            }
        })    
    })
    app.get('/server/player/:playerName/:season', (req,res)=> {
        console.log("in playerRoutes");
        // console.log(req.params);
        // console.log(req.query);
        // var syn = "show tables";
        var season = 'RegSeasonPlayer';
        if(req.query.season == 'post'){
            season = 'PostSeasonPlayer';
        }
        console.log(req.query.playerName);
        var syn = "select * from " + season  + " where year=year  " ; 
        if(req.query.playerName!=undefined) {
            syn+= " and PLAYER = '" + req.query.playerName +"' "
        }
        if(parseInt(req.query.year) > 0 ){
            syn += " and year =  " + parseInt(req.query.year);
        }
        if(parseInt(req.query.PTSlo) >= 0){
            syn += " and PTS >= " + parseInt(req.query.PTSlo);
        }
        if(parseInt(req.query.PTShi) >= parseInt(req.query.PTSlo)){
            syn += " and PTS <= " + parseInt(req.query.PTShi);
        }
        if(parseInt(req.query.ASTlo) >= 0){
            syn += " and AST >= " + parseInt(req.query.ASTlo);
        }
        if(parseInt(req.query.ASThi) >= parseInt(req.query.ASTlo)){
            syn += " and AST <= " + parseInt(req.query.ASThi);
        }
        if(parseInt(req.query.REBlo) >= 0){
            syn += " and REB >= " + parseInt(req.query.REBlo);
        }
        if(parseInt(req.query.REBhi) >= parseInt(req.query.REBlo)){
            syn += " and REB <= " + parseInt(req.query.REBhi);
        }
        if(parseInt(req.query.STLlo) >= 0){
            syn += " and STL >= " + parseInt(req.query.STLlo);
        }
        if(parseInt(req.query.STLhi) >= parseInt(req.query.STLlo)){
            syn += " and STL <= " + parseInt(req.query.STLhi);
        }
        syn += " ORDER BY year DESC";
        console.log(syn);
        // var syn = 'select rp.player,(pp.PTS/rp.PTS) as PTS_RATIO, rp.year,pp.PTS,rp.PTS FROM RegSeasonPlayer rp join PostSeasonPlayer pp on rp.PLAYER_ID = pp.PLAYER_ID and pp.year = rp.year WHERE rp.PTS > 20 ORDER BY PTS_RATIO DESC LIMIT 10'
        connection.query(syn,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result);
                res.send(result);
            }
        })    
    })
    app.get('/server/player',(req, res) => {
        res.send("player page");
    })
    
}