module.exports.get=function(req,res)
{
    res.status(200).json({status: 'test handler'});
};

module.exports.get.params =
    {
        param_a:
            {
                required: true
            },
        param_b:
            {
                required: true
            }
    };

module.exports.post=function(req,res)
{
    res.status(200).json({status: 'test handler'});
};