let fs = require('fs');
let path = require('path');

module.exports.list_js_files = function(dir)
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
};

// unit_test();

function unit_test()
{
    console.log(module.exports.list_js_files('./handlers'));
}