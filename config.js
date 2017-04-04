let fs=require('fs');
let path=require('path');

let config={};

// http configs
let http={};
config.http=http;

http.port=3000;

// https configs
let https={};
config.https=https;

https.port=4000;
https.cert=fs.readFileSync(path.join(__dirname,'cert','cert.pem'));
https.key=fs.readFileSync(path.join(__dirname,'cert','cert.key'));

module.exports=config;
