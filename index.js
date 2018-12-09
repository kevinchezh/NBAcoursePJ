const express = require("express");
const dev = require("./config/dev");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require('cookie-session');
require("./models/User");
require("./services/passport");

mongoose.connect(dev.mongoURI);
const app = express();
//below this to create mysql connection using mysql package
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : dev.mySQL_URL,
//   user     : dev.mySQL_USER,
//   password : dev.mySQL_PASSPORT,
//   database: dev.mySQL_DATABASE_NAME
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });
//sql connection part over
app.use(cookieSession({
  name: 'session',
  keys: [dev.cookieKey],
  // Cookie Options
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days of cookie
}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(passport.session());

require("./routes/authRoutes")(app);
const playerRoutes = require("./routes/playerRoutes");
playerRoutes(app);

const PORT = 5000;
app.listen(PORT);