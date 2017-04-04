let express=require('express');
let router=express.Router();

router.use(function middleware(req,res,next)
{
    console.log(req.url);
    console.log(req.method);
    next();
});
//注意，中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行

router.param('name',function(req,res,next,name)
{
    console.log(name);
    req.name=name;
    next();
});
//上面代码中，get方法为访问路径指定了name参数，param方法则是对name参数进行处理。注意，param方法必须放在HTTP动词方法之前。

router.get('/', require('./handlers/index').get);

router.route('/:test')
    .get(require('./handlers/index').get)
    .post(require('./handlers/index').get)
;

module.exports=router;