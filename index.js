const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')
const dest  =path.resolve(__dirname, '../uploads')
const upload= multer({dest: dest})

module.exports = function()
{

    let app = express();

    app.__proto__.set_router = require('./router')

    app.use(upload.any())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.text())
    app.use(bodyParser.raw())
    app.use(bodyParser.json())
    app.use(access_log) // 默认开启日志记录
    app.use(set_header) // HTTP Response Header

    app.__proto__.start = function(port = 10000, online = server_online)
    {
        app.listen(port, online(port))
    };

    return app;
};

function access_log(req, res, next)
{
    console.log(' ')
    console.log('############### start request log')
    console.log(' ')
    console.log(`${new Date().toLocaleString()} || ${req.ip} || ${req.method} || ${req.path}`);
    console.log(' ')
    console.log('@@@query')
    console.log(req.query)
    console.log(' ')
    console.log('@@@body')
    console.log(req.body)
    console.log(' ')
    console.log('@@@files')
    console.log(req.files)
    console.log(' ')
    console.log('############### end request log')
    console.log(' ')
    next();
}

function set_header(req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
}

function server_online(port)
{
    console.log(`app listening at http://localhost:${port}`);
}