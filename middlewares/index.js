let express=require('express');

function use_middlewares(app)
{
    if(app.use)
    {
        // app.use(express.router);
    }
}

module.exports=use_middlewares;