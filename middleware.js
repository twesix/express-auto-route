let path = require('path');

module.exports=function(app, config)
{
    console.log(`<<< middleware configuration >>>`);
    config.middleware_file_list.forEach(function(e)
    {
        let middleware = require(path.join(config.middleware_root,e))(config);
        if(typeof middleware === 'function')
        {
            app.use(middleware);
            console.log(e);
        }
    });
    console.log(`<<< done middleware configuration >>>`);
};