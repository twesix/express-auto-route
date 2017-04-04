function handle_exceptions(app)
{
    // 404 处理
    app.use(function(req,res,next)
    {
        res.status(404).json({ok:false,err:'not found'});
    });

    //错误处理
    app.use(function(err,req,res,next)
    {
        console.log(err.stack);
        res.status(500).json({ok:false,err:err.message});
    });
}

module.exports=handle_exceptions;