function handle_exceptions(app)
{
    console.log(`<<< exception configuration >>>`);

    // 404 处理
    console.log(`404`);
    app.use(function(req,res,next)
    {
        res.status(404).json({status: 'Not Found'});
    });

    //错误处理 : 在中间件中带参数调用next方法的时候这个错误处理函数会触发
    console.log(`middleware error`);
    app.use(function(err,req,res,next)
    {
        console.error(err.stack);
        res.status(500).json({status: 'Server Error', message: err});
        next()
    });

    console.log(`<<< done exception configuration >>>`);
}

module.exports=handle_exceptions;