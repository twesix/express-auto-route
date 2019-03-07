let express = require('express')

module.exports = function()
{

    let app = express();

    app.__proto__.set_router = require('./router')

    app.use('/', access_log) // 默认开启日志记录

    app.__proto__.start = function(port = 10000, online = server_online)
    {
        app.listen(port, online(port))
    };

    return app;
};

function access_log(req, res, next)
{
    console.log('=== request log ===')
    console.log(`${new Date()} || ${req.ip} || ${req.method} || ${req.path}`);
    console.log('--- query ---')
    console.log(req.query)
    console.log('--- end query --- ')
    console.log('--- body ---')
    console.log(req.body)
    console.log('--- end body ---')
    console.log('=== end request log ===')
    next();
}


function server_online(port)
{
    console.log(`app listening at http://localhost:${port}`);
}