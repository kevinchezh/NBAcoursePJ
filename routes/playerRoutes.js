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
    app.get('/server/player/draw', (req,res)=>{
        console.log('in draw data fetch page');
        console.log(req.query.property);
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
        console.log('in player detail routes');
        console.log(req.params.playerName);
        var query = "SELECT PLAYER, SUM(GP*PTS)/SUM(GP) as average FROM RegSeasonPlayer WHERE PLAYER = '" + req.params.playerName + "'"; ;
        connection.query(query,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result);
                res.send(result);
            }
        })    
    })
    app.get('/server/player/:playerName/:year', (req,res)=> {
        // console.log("in playerRoutes");
        // console.log(req.params);
        // console.log(req.query);
        // var syn = "show tables";
        var syn = "select * from RegSeasonPlayer where PLAYER = '" + req.query.playerName +"'" ; 
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
        // var syn = 'select rp.player,(pp.PTS/rp.PTS) as PTS_RATIO, rp.year,pp.PTS,rp.PTS FROM RegSeasonPlayer rp join PostSeasonPlayer pp on rp.PLAYER_ID = pp.PLAYER_ID and pp.year = rp.year WHERE rp.PTS > 20 ORDER BY PTS_RATIO DESC LIMIT 10'
        connection.query(syn,(error,result,field)=>{
            if(error) console.log(error);
            else{
                res.send(result);
            }
        })    
    })
    app.get('/server/player',(req, res) => {
        res.send("player page");
    })
    
}