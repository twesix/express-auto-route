const path = require('path')
const multer = require('multer')
const dest  =path.resolve(__dirname, '../pages/img')
const upload= multer({dest: dest})

module.exports.post=function(req,res)
{
    res.status(200).json({status: 'test handler'});
};

module.exports.middlewares = []

