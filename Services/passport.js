const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require("../config/dev");
const mongoose = require("mongoose");

//this is our model class
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
    done(null, user.id); 
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser) {
            done(null, existingUser);
        } else {
            const user = await new User({googleId: profile.id, favoritePlayer: "none", favoriteTeam:"none"}).save();
            done(null, user);
        }
  }
));