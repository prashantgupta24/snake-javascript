var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var Cloudant = require('cloudant');

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

// Initialize Cloudant with settings from .env
//var username = process.env.cloudant_username || "nodejs";
//var password = process.env.cloudant_password;

var cloudant = Cloudant({
  account: username,
  password: password
});

// // Remove any existing database called "main".
// cloudant.db.destroy('main', function(err) {
//
//   // Create a new "main" database.
//   cloudant.db.create('main', function() {
//
//     // Specify the database we are going to use (main)...
//     var main = cloudant.db.use('main')
//
//     // ...and insert a document in it.
//     main.insert({ crazy: true }, 'rabbit', function(err, body, header) {
//       if (err) {
//         return console.log('[main.insert] ', err.message);
//       }
//
//       console.log('You have inserted the rabbit.');
//       console.log(body);
//     });
//   });
// });

var main = cloudant.db.use('main')

// ...and insert a document in it.
main.insert({
  d: 133
}, 'rabbit', function(err, body, header) {
  if (err) {
    return console.log('[main.insert] ', err.message);
  }

  console.log('You have inserted the rabbit.');
  console.log(body);
});

main.get("rabbit", function(err, data) {
  // The rest of your code goes here. For example:
  console.log("Found dog:", data);
});
