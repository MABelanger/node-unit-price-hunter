'use strict';

import path from 'path';

import handleRequest from './handle-request';

const IS_MOCK = false;

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('clientEvent', function(jsonData) {
    let dataClient = JSON.parse(jsonData);
    handleRequest.emitToClient(dataClient, socket, IS_MOCK, 'ALIM');
  }); // end clientEvent()

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
