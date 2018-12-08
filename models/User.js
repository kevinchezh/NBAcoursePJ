const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  googleId: String,
  favoritePlayer: String,
  favoriteTeam: String
});

mongoose.model('User', UserSchema);