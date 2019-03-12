const ear = require('..');
const path = require('path');
const express = require('express')

const app = ear();
// now app is just the object returned by calling express()
// but it now has some methods add to its __proto__

// setup your app
app.set('trust proxy', true);

// use your middlewares here !
//app.use();

// handler_dir_path must be absolute path
app.set_router(path.resolve(__dirname, 'handlers'))

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.start(/* 10000, function(){ console.log('server online !') } */)