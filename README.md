# express-framework
基于express的简易自动化应用配置框架

## Languages
[English](README_en.md)

## 用途

在使用express开发后台应用的过程中，总是会去做一些重复性的工作，比如配置路由，中间件，异常和错误处理。
为了简化开发过程，减少代码的重复，我把在使用express时的一些公共代码抽出来，写成了这个独立的模块。

## 用法

```javascript
const ear = require('express-auto-route');
const path = require('path');

const app = ear();
// app就是express应用对象, 框架在上面封装了一些方法

// 设置
app.set('trust proxy', true);

// 配置中间件
//app.use(function(req, res, next){next()});

// handler_dir_path必须是绝对路径
// 框架会自动把目录下的文件根据文件名映射到路径
// 如果要配置多级路径
// 直接将多级路径用.连接构成文件名即可
app.set_router(path.resolve(__dirname, 'handlers'))

// 例如下面的映射方式
/*
=== configuring router ===
/file_upload ==> handlers\file_upload.js
/ ==> handlers\index.js
/return_body ==> handlers\return_body.js
/save_mongodb ==> handlers\save_mongodb.js
/test/subpath ==> handlers\test.subpath.js
=== done configuring router ===
 */

app.start(/* 10000, function(){ console.log('server online !') } */)
```
