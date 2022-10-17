var express = require('express');
var http = require('http');
var https = require('https')
var logger = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var app = express();
var cors = require('cors');
var fs = require('fs');
var ROSLIB = require('roslib');
var request = require('request');

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

  updateClient(lastValue);

});

function updateClient(postData){
  var url = 'http://147.182.203.142:9091/setRobot/'+postData;
  request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Aqui podes ver o HTML da página pedida. 
  }
})

}


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
