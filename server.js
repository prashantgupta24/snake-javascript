var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var Cloudant = require('cloudant');
var jsonfile = require('jsonfile')
var dataFile = 'data/ranking.json'

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});

server.listen((process.env.PORT || 5000), function() {
  console.log('Starting server on port 5000');
});

var obj = {name: 'JP'}

jsonfile.writeFile(dataFile, obj, function (err) {
  console.error(err)
})
