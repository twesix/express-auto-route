let path = require('path');
let express = require('express');

let default_config={};
default_config.port = 10000;
default_config.handler_root = path.resolve(__dirname,'./handlers');
default_config.middleware_root = path.resolve(__dirname,'./middlewares');
default_config.app_config = {'trust proxy': true};

module.exports = function(config)
{
    config = Object.assign(default_config, config);
    config.handler_root = path.resolve(config.handler_root);
    config.middleware_root = path.resolve(config.middleware_root);

    let app = express();

    // 应用配置
    let app_configs = Object.keys(config.app_config);
    app_configs.forEach(function(e)
    {
        console.log(`<<< app configuration >>>`);
        console.log(`${e} : ${config.app_config[e]}`);
        app.set(e, config.app_config[e]);
        console.log(`<<< done app configuration >>>`);
    });
    console.log();
    console.log();

    // 设置中间件
    console.log(`[ middleware root ] ${config.middleware_root}`);
    require('./middleware')(app, config.middleware_root);
    console.log();
    console.log();

    // 设置路由
    console.log(`[ handler root ] ${config.handler_root}`);
    app.use('/',require('./router')(config.handler_root));
    console.log();
    console.log();

    // 处理各种异常和错误
    require('./exception')(app);
    console.log();
    console.log();

    // 启动服务器
    app.listen(config.port, server_online(config.port));

    return app;
};

function server_online(port)
{
    console.log(`app listening at http://localhost:${port}`);
}



// unit_test();
function unit_test()
{
    module.exports
    (
        {
            port: 3000,
            handler_root: './handlers',
            middleware_root: './middlewares',
            app_config:
                {
                    'trust proxy': true
                }
        }
    );
}