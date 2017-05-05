let fs = require('fs');

module.exports.list_js_files = function(dir)
{
    let file_list = fs.readdirSync(dir);
    let js_files = [];
    file_list.forEach(function(e)
    {
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
    console.log(list_js_file(__dirname));
}