module.exports = function(config)
{
    return function(req, res, next)
    {
        console.log('===')
        console.log(`[ ${new Date()} ] ( ${req.ip} ) ${req.method} ${req.path}`);
        console.log(req.query)
        console.log(req.body)
        console.log('===')
        next();
    }
};