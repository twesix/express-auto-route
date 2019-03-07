let express = require('express');

module.exports = function()
{

    let app = express();

    app.__proto__.set_routes = require('./router');
    app.__proto__.enable_access_log = enable_access_log;
    app.__proto__.set_vars = set_vars;

    app.__proto__.start = function(port = 10000, online = server_online)
    {
        app.listen(port, online(port));
    };

    return app;
};


function enable_access_log()
{
    this.use('/', require('./middlewares/access_log')());
}

// 通过中间件设置一个全局变量
// 每一次有请求到达时
// 这个全局变量对象就会挂到此次请求的req变量上
function set_vars(vars)
{
    this.use('/', require('./middlewares/vars')(vars));
}


function server_online(port)
{
    console.log(`app listening at http://localhost:${port}`);
}