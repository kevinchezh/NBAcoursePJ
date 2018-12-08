const mongoose = require('mongoose');
const passport = require("passport");
const User =require("../models/User");

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

 // Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
 //        if(err){
 //            res.redirect("/campgrounds");
 //        } else {
 //            res.redirect("/campgrounds/" + req.params.id);
 //        }
 //    });

	app.post('/api/editProfile', async (req, res) => {
		const { favoritePlayer, favoriteTeam } = req.body;
		const user = new User({
			favoritePlayer,
			favoriteTeam,
			googleId: req.user.id
		});
		try{
			await User.save();
		} catch (err) {
			res.status(422).send(err);
		}
	});
}