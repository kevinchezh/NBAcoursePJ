module.exports = app => {
    app.get('/player', (req,res)=> {
        res.send("player root page");
    })
}