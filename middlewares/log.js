module.exports = function(req, res, next)
{
    console.log(`[ ${new Date()} ] ( ${req.ip} ) ${req.method} ${req.path}`);
    next();
};