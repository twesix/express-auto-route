module.exports.get=function(req,res)
{
    res.status(200).json({status: 'test subpath handler'});
};

module.exports.post=function(req,res)
{
    res.status(200).json({status: 'test subpath handler'});
};