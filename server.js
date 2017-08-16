require('dotenv').config()

var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var redis = require('redis');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(cookieParser());
app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});

app.get('/' + process.env.CLEAR_DB, function(request, response) {
  redisClient.set(redisKey, '');
  response.end('Database deleted!');
});

server.listen((process.env.PORT || 5000), function() {
  console.log('Starting server on port 5000');

});

var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URI, {
  no_ready_check: true
});

redisClient.auth(process.env.REDIS_PW, function(err) {
  if (err) throw err;
});

var objArray = [];
var redisKey = 'dbSnake';

io.on('connection', function(socket) {

  socket.on('new player', function() {
    console.log('new player joined');
    readDataAndEmit();
  });

  socket.on('result', function(data) {
    let obj = {
      name: data.name,
      val: data.val
    };

    redisClient.get(redisKey, function(err, reply) {
      if (err) throw err;

      objArray = reply ? JSON.parse(reply) : [];
      objArray.push(obj);
      sortAndCleanData(objArray);
      redisClient.set(redisKey, JSON.stringify(objArray));
      objArray = [];
    });
  });

  function sortAndCleanData(objArray) {
    objArray.sort(function(a, b) {
      return parseInt(b.val) - parseInt(a.val);
    });
    if (objArray.length > 9) {
      objArray.pop();
    }
  }

  function readDataAndEmit() {
    redisClient.get(redisKey, function(err, reply) {
      if (err) throw err;

      socket.emit('updateScoreboard', reply ? JSON.parse(reply) : []);
    });
  }

  setInterval(function() {
    readDataAndEmit();
  }, 5000);
});
