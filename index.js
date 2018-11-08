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

app.use(cookieSession({
  name: 'session',
  keys: [dev.cookieKey],
  // Cookie Options
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days of cookie
}))

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = 5000;
app.listen(PORT);