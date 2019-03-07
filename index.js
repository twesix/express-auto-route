let express = require('express')

module.exports = function()
{

    let app = express();

    app.__proto__.set_router = require('./router')

    app.__proto__.enable_access_log = enable_access_log
    app.enable_access_log() // 默认开启日志记录

    app.__proto__.start = function(port = 10000, online = server_online)
    {
        app.listen(port, online(port))
    };

    return app;
};


function enable_access_log()
{
    this.use('/', require('./middlewares/access_log')());
}


function server_online(port)
{
    console.log(`app listening at http://localhost:${port}`);
}