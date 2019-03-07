const path = require('path');
const express=require('express');
const fs = require('fs')

module.exports = function(handler_dir_path)
{
    const router = build_router(list_js_files(handler_dir_path));
    this.use('/', router);
};

function build_router(handler_file_list)
{
    // 文件列表是绝对路径

    console.log()
    console.log('=== configuring router ===')
    const router=express.Router();
    handler_file_list.forEach(function(file_path)
    {

        let handler = require(file_path);
        let request_path;
        if(file_path.split(path.sep).pop() === 'index.js')
        {
            request_path = '/';
        }
        else
        {
            request_path = '/'
            let file_name = file_path.split(path.sep).pop();
            let file_name_arr = file_name.split('.')
            file_name_arr.pop()
            request_path = request_path + file_name_arr.join('/')
        }
        console.log(`${request_path} ==> ${file_path}`);
        if(typeof handler.get === 'function')
        {
            router.get(request_path, handler.get);
        }
        if(typeof handler.post === 'function')
        {
            router.post(request_path, handler.post);
        }
    });
    console.log('=== done configuring router ===')
    console.log()
    return router;
}
function test_build_router()
{
    build_router(list_js_files('.'))
}
// test_build_router()

function list_js_files(dir)
{
    let file_list = fs.readdirSync(dir);
    let js_files = [];
    file_list.forEach(function(e)
    {
        e = path.join(dir, e);
        e = path.resolve(e); // 转换成绝对路径，避免之后使用文件列表时因为路径问题出现错误。
        if( ! fs.statSync(e).isFile())
        {
            return;
        }
        if(e.split('.').pop() === 'js')
        {
            js_files.push(e);
        }
    });
    return js_files;
}

function test_list_js_files()
{
    console.log(list_js_files('.'));
}
// test_list_js_files()