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
    
    app.get('/server/player/:playerName', (req,res)=> {
        console.log("in playerRoutes");
        console.log(req.params.playerName);

        // var syn = "show tables";
        var syn = "select * from RegSeasonPlayer where PLAYER = '" + req.params.playerName +"'"; 
        // var syn = 'select rp.player,(pp.PTS/rp.PTS) as PTS_RATIO, rp.year,pp.PTS,rp.PTS FROM RegSeasonPlayer rp join PostSeasonPlayer pp on rp.PLAYER_ID = pp.PLAYER_ID and pp.year = rp.year WHERE rp.PTS > 20 ORDER BY PTS_RATIO DESC LIMIT 10'
        connection.query(syn,(error,result,field)=>{
            if(error) console.log(error);
            else{
                console.log(result)
                res.send(result);
            }
        })    
    })
    app.get('/server/player',(req, res) => {
        res.send("player page");
    })
    
}