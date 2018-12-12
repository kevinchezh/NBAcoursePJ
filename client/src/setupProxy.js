const proxy = require('http-proxy-middleware');
module.exports = (app) => {
    app.use(proxy('/server/player/*', {target: 'http://localhost:5000'}))
    app.use(proxy('/auth/google', {target: 'http://localhost:5000'}))
    app.use(proxy('/server/player', {target: 'http://localhost:5000'}))

    app.use(proxy('/server/team/*', {target: 'http://localhost:5000'}))
    app.use(proxy('/server/team', {target: 'http://localhost:5000'}))

    app.use(proxy('/server/trivial', {target: 'http://localhost:5000'}))
    app.use(proxy('/server/trivial/*', {target: 'http://localhost:5000'}))
    app.use(proxy('/api/*', {target: 'http://localhost:5000'}))
    app.use(proxy('/server/fantasy/*', {target: 'http://localhost:5000'}))
    app.use(proxy('/server/fivePlayerFantasy/*/*/*/*/*', {target: 'http://localhost:5000'}))
}

