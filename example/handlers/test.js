const validator = require('validator');

module.exports.get=function(req,res)
{
    console.log(req.vars);
    res.status(200).json({ status: 'test handler' });
};

module.exports.get.params =
    {
        param_a:
            {
                required: true,
                validator: validator.isEmail
            },
        param_b:
            {
                required: true,
                validator: validator.isIP
            }
    };

module.exports.post=function(req,res)
{
    res.status(200).json({status: 'test handler'});
};