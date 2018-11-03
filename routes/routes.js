module.exports = app =>{
	app.get('/', (req, res) => {
		res.send('this is one backend page');
	});
}