let list_js_file = require('../util').list_js_files;
let path = require('path');

module.exports = function(config)
{
    const rules = {};

    config.handler_file_list.forEach(function(e)
    {
        let temp = e.split('.');
        temp.pop();
        let request_path = '/' + temp.join('.');
        rules[request_path] = require(path.join(config.handler_root, e)).get.params;
    });
    console.log(rules);

    return function(req, res, next)
    {
        let query = req.query;
        let rule = rules[req.path];
        let pass = true;
        console.log('<<< Doing parameter check >>>');
        console.log(rule);
        console.log('-$-$-$-');
        console.log(query);
        for(let param in rule)
        {
            if(rule[ param ])
            {
                if(rule[ param ].required)
                {
                    if( ! query[ param ])
                    {
                        res.status(200).json
                        (
                            {
                                status: 'param_check_failed',
                                message: `parameter [ ${ param } ] is not valid or does not exist`
                            }
                        );
                        pass = false;
                    }
                }
            }
        }
        console.log('-$-$-$-');
        console.log(`passed ? : ${ pass }`);
        console.log('<<< Done parameter check >>>');
        if(pass)
        {
            next();
        }
    };
};