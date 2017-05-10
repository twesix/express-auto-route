const ef = require('./index');
const path = require('path');

const app = ef();
// now app is just the object returned by calling express()
// but it now has some methods add to its __proto__

// setup your app
app.set('trust proxy', true);

// use your middlewares here !
//app.use();

// a simple access log middleware, use it or not as your will
app.enable_access_log();

app.set_routes
(
    // map the handler dir to request path
    {
        '/': path.resolve('./handlers'),
        '/sub': path.resolve('./handlers/sub')
    }
);

// set default handler for 404 and error
// comment this if you want to handle 404 and error in your own way
app.handle_exceptions();

app.start(/* 10000, function(){ console.log('server online !') } */);