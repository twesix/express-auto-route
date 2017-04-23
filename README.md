# express-framework
基于express的简易自动化应用配置框架

## 用途

在使用express开发后台应用的过程中，总是会去做一些重复性的工作，比如配置路由，中间件，异常和错误处理。
为了简化开发过程，减少代码的重复，我把在使用express时的一些公共代码抽出来，写成了这个独立的模块。

这个模块并没有发布在npm上，一来是仅仅对于我的开发习惯来说比较方便，二来是这些代码还处于不断变动之中，我自己也没有进行
严格的测试。使用的时候自己把repo克隆一份放到工程目录下，这样无论在开发哪个工程的时候发现问题都可以直接修改，然后同步到
其他用到了这个框架的工程

## 用法

```js
let ef = require('../express-framework');
let path = require('path');

// 应用配置
let config =
    {
        // 中间件根目录， 如果没有提供这个参数，会使用默认的一个访问记录中间件
        middleware_root: path.resolve('./middlewares'),
        
        // handler根目录，也就是应用的每个功能的实现文件所在目录
        // 比如，我的应用有个登录功能在login.js中，那么会自动设置路由 /login 由login.js模块的exports来处理，get和post会分别设置好
        handler_root: path.resolve('./handlers'),
        
        // 应用的监听端口
        port: 10000,
        
        // 应用的配置，键值对的形式，会用app.set(key, value)来对应用进行配置
        app_config: 
        {
          'trust proxy': true
        }
    };

// 启动应用
ef(config);
```
