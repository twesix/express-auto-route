let path = require('path');
let list_js_files = require('./util').list_js_files;

module.exports=function(app, middleware_root)
{
    let js_files = list_js_files(middleware_root);
    console.log(`<<< middleware configuration >>>`);
    js_files.forEach(function(e)
    {
        let middleware = require(path.join(middleware_root,e));
        if(typeof middleware === 'function')
        {
            app.use(middleware);
            console.log(e);
        }
    });
    console.log(`<<< done middleware configuration >>>`);
};