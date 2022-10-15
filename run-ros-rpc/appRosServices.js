var express = require('express');
var http = require('http');
var https = require('https')
var logger = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var app = express();
var cors = require('cors');
var fs = require('fs');
var ROSLIB = require('roslib');

app.use(logger('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ // parse application/x-www-form-urlencoded
    parameterLimit: 100000, // bigger parameter sizes
    limit: '5mb', // bigger parameter sizes
    extended: false
}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(cors())

/*
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
*/

/*
var key = fs.readFileSync('/opt/selfsigned.key');
var cert = fs.readFileSync('/opt/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};*/

var httpServer = http.createServer(app);

var door = 9091;


httpServer.listen(door || process.env.PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log("server starting on port : " + door)
    console.log('ROS services RPC server is up')
})

/*
var doorHttps = 9092;
var privateKey  = fs.readFileSync('/opt/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('/opt/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
//var httpsServer = https.createServer(credentials, app);
//httpsServer.listen(doorHttps);

const options = {
  key: fs.readFileSync('/opt/key.pem'),
  cert: fs.readFileSync('/opt/cert.pem'),
};

https.createServer(options, app).listen(doorHttps);
*/

app.get('/', (req, res) => {
    console.log("Welcome to our ROS RPC Service");
    var obj = {};
    obj["result"] = true;
    obj["welcome"] = "Welcome to our NeoCompiler Eco Compilers RPC API - NeoResearch.";
    var arrMethods = [];
    arrMethods.push({
        method: "/statusnode/:node",
        info: "CN Routes"
    });
    arrMethods.push({
        method: "/incstorage/:height",
        info: "get incremental storage differences for desired height parameter"
    });
    arrMethods.push({
        method: "socket.io",
        info: "{ timeleft: timeleft, compilations: ecoInfo.compilationsSince, deploys: ecoInfo.deploysSince, invokes: ecoInfo.invokesSince }"
    });
    arrMethods.push({
        method: "/resetdockerservice/:pwd",
        info: "Reset docker service (current not working)"
    });
    arrMethods.push({
        method: "/setconsensusnodesblocktime/:node/:spb/:pwd",
        info: "Reset a node (node) with desired block time (spb). Only works with the correct pwd."
    });
    obj["methods"] = arrMethods;
    res.send(obj);

});

var ros = new ROSLIB.Ros({
  url : 'ws://ros-bridge-running:9090'
});

ros.on('connection', function() {
  console.log("Connected");
});

ros.on('error', function(error) {
  console.log(error);
});

ros.on('close', function() {
  console.log("Closed");
});

var txt_listener = new ROSLIB.Topic({
  ros : ros,
  name : '/txt_msg',
  messageType : 'std_msgs/String'
});

txt_listener.subscribe(function(m) {
  console.log("subscribing");
  console.log(m.data);
  lastValue = m.data;
});

var lastValue = "empty";

app.get('/robot', function(req, res) {
    var arrMethods = {};
    arrMethods["value"] = lastValue;
    res.send(arrMethods);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
