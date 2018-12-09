const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  googleId: String,
  favoritePlayer: String,
  favoriteTeam: String
});

exports.User = mongoose.model('User', UserSchema);

