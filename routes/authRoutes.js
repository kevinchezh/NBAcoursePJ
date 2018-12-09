const mongoose = require('mongoose');
const passport = require("passport");
const User =require("../models/User").User;
const requireLogin = require("../middlewares/requireLogin");


module.exports = app =>{
	app.get('/',
		(req, res) => {
			res.send("this is the main backend page(testing)");
		}
	);

	app.get('/auth/google',
	  	passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', 
		passport.authenticate('google', { failureRedirect: '/login' }),
		(req, res) => {
    // Successful authentication, redirect home.
   		res.redirect('/');
   		}
   	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	app.post('/api/editProfile', requireLogin, (req, res) => {
		const { favoritePlayer, favoriteTeam } = req.body;
		try{
			User.findById(req.user.id, function (err, user) {
				console.log(user);
  				if (err){
  					console.log(err);
  				} else{
  					user.favoritePlayer = favoritePlayer;
  					user.favoriteTeam = favoriteTeam;
  					user.save(function (err, updatedUser) {
    					if (err){
    						console.log(err);
  						} else{
    						res.send(updatedUser);
    					}
  					});
  				}
			});
		} catch (err) {
			res.status(422).send(err);	
	}
	});
}