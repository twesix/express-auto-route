let path = require('path');
let express=require('express');
let router=express.Router();
let list_js_files = require('./util').list_js_files;

module.exports=function(handler_root)
{
    let js_files = list_js_files(handler_root);
    console.log(`<<< router configuration >>>`);
    js_files.forEach(function(e)
    {
        let handler = require(path.join(handler_root,e));
        if(typeof handler.get === 'function')
        {
            if(e === 'index.js')
            {
                router.get('/', handler.get);
                console.log(`GET  /`);
            }
            else
            {
                router.get('/'+e.split('.')[0], handler.get);
                console.log(`GET  /${e.split('.')[0]}`);
            }
        }
        if(typeof handler.post === 'function')
        {
            if(e === 'index.js')
            {
                router.post('/', handler.post);
                console.log(`POST /`);
            }
            else
            {
                router.post('/'+e.split('.')[0], handler.post);
                console.log(`POST /${e.split('.')[0]}`);
            }
        }
    });
    console.log(`<<< done router configuration >>>`);
    return router;
};