var express = require('express');
var http = require('http');
var https = require('https')
var logger = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var app = express();
var cors = require('cors');
var fs = require('fs');

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

var httpServer = http.createServer(app);

var door = 9091;


httpServer.listen(door || process.env.PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log("server starting on port : " + door)
    console.log('ROS services RPC server is up')
})

var doorHttps = 9092;
var privateKey  = fs.readFileSync('/opt/server.key', 'utf8');
var certificate = fs.readFileSync('/opt/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
https.createServer(credentials, app).listen(doorHttps);

app.get('/', (req, res) => {
    console.log("Welcome to our ROS RPC Service");
    var obj = {};
    obj["result"] = true;
    obj["welcome"] = "Welcome to our NeoCompiler Eco Compilers RPC API - NeoResearch.";
    var arrMethods = [];
    arrMethods.push({
        method: "/robot",
        info: "Get robot current value"
    });
    obj["methods"] = arrMethods;
    res.send(obj);
});

var lastValue = "empty";

app.get('/robot', function(req, res) {
  var arrMethods = {};
  arrMethods["value"] = lastValue;
  res.send(arrMethods);
});

app.get('/setRobot/:sensorValue', function(req, res) {
    lastValue = req.params.sensorValue;
    var arrMethods = {};
    arrMethods["result"] = true
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