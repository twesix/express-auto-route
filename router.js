const path = require('path');
const express=require('express');
const router=express.Router();
const list_js_files = require('./util').list_js_files;

module.exports = function(configs)
{

    for(let key in configs)
    {
        if( ! configs.hasOwnProperty(key))
        {
            continue;
        }
        const router = build_router(list_js_files(configs[key]));
        this.use(key, router);
    }
};

function build_router(handler_file_list)
{
    // 文件列表是绝对路径

    const router=express.Router();
    handler_file_list.forEach(function(e)
    {

        let handler = require(e);
        let request_path;
        if(e.split(path.sep).pop() === 'index.js')
        {
            request_path = '/';
        }
        else
        {
            request_path = '/'+e.split('.').shift().split(path.sep).pop();
        }
        console.log(request_path);
        if(typeof handler.get === 'function')
        {
            router.use(request_path, build_param_checker(handler.get.params));
            router.get(request_path, handler.get);
        }
        if(typeof handler.post === 'function')
        {
            router.post(request_path, handler.post);
        }
    });
    return router;
}

function build_param_checker(rule)
{
    return function(req, res, next)
    {
        if(req.method.toLowerCase() !== 'get')
        {
            next();
            return;
        }

        let query = req.query;
        let pass = true;

        for(let param in rule)
        {
            if( ! rule.hasOwnProperty(param))
            {
                continue;
            }
            if( ! rule[ param ])
            {
                continue;
            }
            if( ! rule[ param ].required)
            {
                continue;
            }
            if( ! query[ param ])
            {
                res.status(200).json
                (
                    {
                        status: 'param_check_failed',
                        message: `parameter [ ${ param } ] does not exist`
                    }
                );
                pass = false;
                break;
            }
            if(typeof rule[ param ].validator !== 'function')
            {
                continue;
            }
            if( ! rule[ param ].validator(query[ param ]))
            {
                res.status(200).json
                (
                    {
                        status: 'param_check_failed',
                        message: `parameter [ ${ param } ] is not valid`
                    }
                );
                pass = false;
                break;
            }
        }
        if(pass)
        {
            next();
        }
    };
}