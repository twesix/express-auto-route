module.exports = function(vars)
{
    return function(req, res, next)
    {
        req.vars = vars;
        next();
    }
};