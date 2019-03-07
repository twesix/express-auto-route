module.exports = function(config)
{
    return function(req, res, next)
    {
        console.log('=== request log ===')
        console.log(`${new Date()} || ${req.ip} || ${req.method} || ${req.path}`);
        console.log('--- query ---')
        console.log(req.query)
        console.log('--- end query --- ')
        console.log('--- body ---')
        console.log(req.body)
        console.log('--- end body ---')
        console.log('=== end request log ===')
        next();
    }
};